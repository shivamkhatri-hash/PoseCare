/**
 * Adaptive Confidence Filter for MediaPipe Pose Landmarks
 * 
 * Protects joint-angle calculations and rep-counting state machines from:
 * 1. Sudden coordinate spikes caused by momentary occlusion (e.g. arm passing behind body)
 * 2. High-frequency noise in poor lighting conditions
 * 3. Low visibility / presence detections by smoothly applying confidence-weighted decay and velocity dampening
 */

export class AdaptiveConfidenceFilter {
  /**
   * @param {Object} options
   * @param {number} options.minConfidence - Minimum visibility threshold below which coordinates are held/damped (default: 0.45)
   * @param {number} options.highConfidence - Visibility threshold above which raw data is fully trusted (default: 0.75)
   * @param {number} options.maxOcclusionFrames - Number of frames to hold last known position before flagging hard occlusion (default: 15)
   * @param {number} options.velocityDamping - Velocity decay per frame during occlusion (default: 0.85)
   */
  constructor(options = {}) {
    this.minConfidence = options.minConfidence ?? 0.45;
    this.highConfidence = options.highConfidence ?? 0.75;
    this.maxOcclusionFrames = options.maxOcclusionFrames ?? 15;
    this.velocityDamping = options.velocityDamping ?? 0.85;

    // Track per-landmark historical state
    // index -> { x, y, z, vx, vy, vz, lastValidTime, occlusionCount, confidenceScore }
    this.states = {};
    this.lastTimestamp = null;
  }

  reset() {
    this.states = {};
    this.lastTimestamp = null;
  }

  /**
   * Filter and stabilize an array of 33 MediaPipe pose landmarks
   * @param {Array} landmarks - Raw MediaPipe landmark array [{x, y, z, visibility, presence}]
   * @param {number} timestamp - Current frame timestamp in ms
   * @returns {Object} { filteredLandmarks, globalConfidence, occludedJointIndices }
   */
  filter(landmarks, timestamp = performance.now()) {
    if (!landmarks || landmarks.length === 0) {
      return {
        filteredLandmarks: [],
        globalConfidence: 0,
        occludedJointIndices: []
      };
    }

    const dt = this.lastTimestamp ? Math.max(0.001, (timestamp - this.lastTimestamp) / 1000) : 1 / 30;
    this.lastTimestamp = timestamp;

    let totalConfidence = 0;
    const occludedJoints = [];

    const filteredLandmarks = landmarks.map((raw, idx) => {
      const visibility = raw.visibility !== undefined ? raw.visibility : 1.0;
      const presence = raw.presence !== undefined ? raw.presence : 1.0;
      const combinedConfidence = Math.min(visibility, presence);

      totalConfidence += combinedConfidence;

      let state = this.states[idx];
      if (!state) {
        state = {
          x: raw.x,
          y: raw.y,
          z: raw.z || 0,
          vx: 0,
          vy: 0,
          vz: 0,
          occlusionCount: 0,
          confidence: combinedConfidence
        };
        this.states[idx] = state;
        return {
          ...raw,
          x: raw.x,
          y: raw.y,
          z: raw.z || 0,
          visibility: combinedConfidence,
          isInterpolated: false
        };
      }

      // Case A: High Confidence -> Direct follow with velocity tracking
      if (combinedConfidence >= this.highConfidence) {
        state.occlusionCount = 0;
        const vx = (raw.x - state.x) / dt;
        const vy = (raw.y - state.y) / dt;
        const vz = ((raw.z || 0) - state.z) / dt;

        // Smooth velocity estimates
        state.vx = state.vx * 0.3 + vx * 0.7;
        state.vy = state.vy * 0.3 + vy * 0.7;
        state.vz = state.vz * 0.3 + vz * 0.7;

        state.x = raw.x;
        state.y = raw.y;
        state.z = raw.z || 0;
        state.confidence = combinedConfidence;

        return {
          ...raw,
          x: state.x,
          y: state.y,
          z: state.z,
          visibility: combinedConfidence,
          isInterpolated: false
        };
      }

      // Case B: Medium Confidence -> Adaptive Blend between prediction & measurement
      if (combinedConfidence >= this.minConfidence) {
        state.occlusionCount = 0;
        // Weight factor between 0 (at minConfidence) and 1 (at highConfidence)
        const alpha = (combinedConfidence - this.minConfidence) / (this.highConfidence - this.minConfidence);

        // Projected coordinate from velocity
        const projX = state.x + state.vx * dt;
        const projY = state.y + state.vy * dt;
        const projZ = state.z + state.vz * dt;

        // Blend measured coordinate with projected coordinate
        state.x = raw.x * alpha + projX * (1 - alpha);
        state.y = raw.y * alpha + projY * (1 - alpha);
        state.z = (raw.z || 0) * alpha + projZ * (1 - alpha);

        // Damp velocity slightly
        state.vx *= this.velocityDamping;
        state.vy *= this.velocityDamping;
        state.vz *= this.velocityDamping;
        state.confidence = combinedConfidence;

        return {
          ...raw,
          x: state.x,
          y: state.y,
          z: state.z,
          visibility: combinedConfidence,
          isInterpolated: true
        };
      }

      // Case C: Low Confidence / Occlusion (< minConfidence) -> Inertial hold with velocity damping
      state.occlusionCount += 1;
      occludedJoints.push(idx);

      if (state.occlusionCount <= this.maxOcclusionFrames) {
        // Apply damped inertial drift
        state.vx *= this.velocityDamping;
        state.vy *= this.velocityDamping;
        state.vz *= this.velocityDamping;

        state.x += state.vx * dt * 0.5;
        state.y += state.vy * dt * 0.5;
        state.z += state.vz * dt * 0.5;
      } else {
        // Long occlusion: zero out velocity and freeze in place
        state.vx = 0;
        state.vy = 0;
        state.vz = 0;
      }

      state.confidence = combinedConfidence;

      return {
        ...raw,
        x: state.x,
        y: state.y,
        z: state.z,
        visibility: combinedConfidence,
        isInterpolated: true,
        isOccluded: true
      };
    });

    const globalConfidence = landmarks.length > 0 ? totalConfidence / landmarks.length : 0;

    return {
      filteredLandmarks,
      globalConfidence: Math.round(globalConfidence * 100),
      occludedJointIndices: occludedJoints
    };
  }
}
