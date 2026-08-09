(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM loaded, initializing logo animation ===');
    
    // Logo images cycling animation
    const logoContainer = document.getElementById('logo-container');
    const logoImagesContainer = document.getElementById('logo-images-container');
    const logoArea = document.querySelector('.logo-area');
    
    console.log('Logo container:', logoContainer);
    console.log('Logo images container:', logoImagesContainer);
    console.log('Logo area:', logoArea);
    
    if (!logoContainer) {
      console.error('ERROR: logo-container not found!');
      return;
    }
    if (!logoImagesContainer) {
      console.error('ERROR: logo-images-container not found!');
      return;
    }
    if (!logoArea) {
      console.error('ERROR: logo-area not found!');
      return;
    }
    
    console.log('All elements found successfully!');
    
    let currentImageIndex = 0;
    let imageInterval = null;
    const logoImages = logoImagesContainer.querySelectorAll('.logo-image');
    
    console.log('Found', logoImages.length, 'logo images');
    logoImages.forEach((img, idx) => {
      console.log('Image', idx, ':', img.src);
      
      // Check if image loads successfully
      img.addEventListener('load', function() {
        console.log('Image', idx, 'loaded successfully');
      });
      
      img.addEventListener('error', function() {
        console.error('ERROR: Image', idx, 'failed to load:', img.src);
      });
    });

    // Mouse enter - show images container and start cycling
    logoArea.addEventListener('mouseenter', function() {
      console.log('>>> MOUSE ENTERED! Starting image animation...');
      
      // Completely hide the SVG and show the images container
      const svgElement = logoContainer.querySelector('.logo-clover');
      svgElement.style.display = 'none';
      svgElement.style.visibility = 'hidden';
      
      logoImagesContainer.style.display = 'block';
      logoImagesContainer.style.visibility = 'visible';
      logoImagesContainer.style.zIndex = '100';
      
      console.log('Display changed - images shown, SVG hidden');
      
      // Check image dimensions
      const firstImg = logoImages[0];
      console.log('First image natural dimensions:', firstImg.naturalWidth, 'x', firstImg.naturalHeight);
      console.log('First img computed z-index:', window.getComputedStyle(firstImg).zIndex);
      console.log('Container computed z-index:', window.getComputedStyle(logoImagesContainer).zIndex);
      
      if (!imageInterval) {
        console.log('Starting interval timer...');
        // Start with first image
        logoImages.forEach(img => img.classList.remove('active'));
        logoImages[0].classList.add('active');
        currentImageIndex = 0;
        console.log('First image activated, index:', currentImageIndex);
        
        // Cycle through images every 0.5 seconds
        imageInterval = setInterval(function() {
          // Remove active class from current image
          logoImages[currentImageIndex].classList.remove('active');
          
          // Move to next image
          currentImageIndex = (currentImageIndex + 1) % logoImages.length;
          
          // Add active class to new image
          logoImages[currentImageIndex].classList.add('active');
          
          console.log('Switched to image index:', currentImageIndex);
        }, 500);
        
        console.log('Interval started:', imageInterval);
      }
    });

    // Mouse leave - stop and reset to SVG
    logoArea.addEventListener('mouseleave', function() {
      console.log('<<< MOUSE LEFT! Stopping animation...');
      if (imageInterval) {
        clearInterval(imageInterval);
        imageInterval = null;
        console.log('Interval cleared');
        
        // Hide images container and show the SVG again
        logoImagesContainer.style.display = 'none';
        logoImagesContainer.style.visibility = 'hidden';
        logoImagesContainer.style.zIndex = '2';
        
        const svgElement = logoContainer.querySelector('.logo-clover');
        svgElement.style.display = 'block';
        svgElement.style.visibility = 'visible';
        
        console.log('Display reset - images hidden, SVG shown');
        
        // Reset all images
        logoImages.forEach(img => img.classList.remove('active'));
        currentImageIndex = 0;
        
        console.log('Reset complete');
      }
    });
    
    console.log('=== Event listeners attached successfully! ===');
    
    // Contact/Profile modal functionality
    const profileButton = document.querySelector('.profile-button');
    const contactModal = document.getElementById('contact-modal');
    const closeContact = document.querySelector('.close-contact');
    
    if (profileButton && contactModal) {
      console.log('Contact modal elements found');
      
      // Open contact modal when profile button is clicked
      profileButton.addEventListener('click', function() {
        console.log('Profile button clicked - opening contact modal');
        contactModal.style.display = 'block';
      });
      
      // Close contact modal when X is clicked
      if (closeContact) {
        closeContact.addEventListener('click', function() {
          console.log('Close contact button clicked');
          contactModal.style.display = 'none';
        });
      }
      
      // Close contact modal when clicking outside the content
      contactModal.addEventListener('click', function(event) {
        if (event.target === contactModal) {
          console.log('Clicked outside contact modal - closing');
          contactModal.style.display = 'none';
        }
      });
    } else {
      console.error('Contact modal elements not found');
    }
    
    // Ladybug - open new HTML page
    const ladybug = document.querySelector('.ladybug');
    
    if (ladybug) {
      console.log('Ladybug element found');
      
      // Open new page when ladybug is clicked
      ladybug.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent triggering leaf hover events
        console.log('Ladybug clicked - opening new page');
        window.location.href = 'ladybug-details.html';
      });
    } else {
      console.error('Ladybug element not found');
    }
    
    // Gummy star click handler - opens About This Site modal
    const gummyStar = document.querySelector('.gummy-star');
    const aboutModal = document.getElementById('about-modal');
    const closeAbout = document.querySelector('.close-about');
    
    if (gummyStar && aboutModal) {
      console.log('Gummy star element found');
      
      gummyStar.addEventListener('click', function(event) {
        event.stopPropagation();
        console.log('Gummy star clicked - opening About modal');
        aboutModal.style.display = 'block';
      });
      
      if (closeAbout) {
        closeAbout.addEventListener('click', function() {
          aboutModal.style.display = 'none';
        });
      }
      
      aboutModal.addEventListener('click', function(event) {
        if (event.target === aboutModal) {
          aboutModal.style.display = 'none';
        }
      });
    } else {
      if (!gummyStar) console.error('Gummy star element not found');
      if (!aboutModal) console.error('About modal element not found');
    }
    
    // About button (question mark) click handler
    const aboutBtn = document.querySelector('.about-btn');
    if (aboutBtn && aboutModal) {
      aboutBtn.addEventListener('click', function() {
        aboutModal.style.display = 'block';
      });
    } else {
      if (!aboutBtn) console.error('About button not found');
    }
    
    // Photo Booth functionality
    const clickableDewdrop = document.querySelector('.clickable-dewdrop');
    const photoboothModal = document.getElementById('photobooth-modal');
    const closePhotobooth = document.querySelector('.close-photobooth');
    const cameraVideo = document.getElementById('camera-video');
    const captureBtn = document.getElementById('capture-btn');
    const photoCanvas = document.getElementById('photo-canvas');
    const gestureCanvas = document.getElementById('gesture-canvas');
    const cloverEffectsContainer = document.getElementById('clover-effects');
    let cameraStream = null;
    let handLandmarker = null;
    let faceLandmarker = null;
    let isTrackingActive = false;
    
    // Gesture detection state
    let lastBlinkTime = 0;
    let lastWaveTime = 0;
    let lastPinchTime = 0; // Changed from fistOpenTime to pinchTime for green clover
    let lastFistOpenTime = 0; // For blue clover
    let previousHandPosition = null;
    let blinkCooldown = 1500;
    let waveCooldown = 1500;
    let pinchCooldown = 2000; // Cooldown for pinch gesture
    let fistOpenCooldown = 2000;
    let openPalmWaveCooldown = 1500; // Reduced from 2500 to 1500 for easier testing
    let lastOpenPalmWaveTime = 0;
    let indexFingerClickCooldown = 2000; // Cooldown for index finger click gesture
    let lastIndexFingerClickTime = 0;
    
    // Index finger click tracking
    let previousIndexFingerPosition = null;
    let indexFingerVelocityHistory = [];
    
    // Enhanced state tracking for better accuracy
    let earHistory = [];
    const EAR_HISTORY_SIZE = 5;
    let handMovementHistory = [];
    const MOVEMENT_HISTORY_SIZE = 10;
    let fistState = 'none';
    let pinchState = 'none'; // State machine for pinch detection
    let openPalmWaveState = 'none'; // State machine for open palm + finger wave detection
    let indexFingerClickState = 'none'; // State machine for index finger point + click gesture
    
    // Blink particle effects
    let blinkParticles = [];
    
    // Colorful ripple particle effects (for open palm + finger wave gesture)
    let rippleParticles = [];
    
    // Star particle effects (for index finger click gesture)
    let starParticles = [];
    
    // Clover collision tracking - stores bounding boxes of all clovers
    let cloverColliders = [];
    
    // Update clover colliders based on current DOM elements
    function updateCloverColliders() {
      cloverColliders = [];
      
      if (!cloverEffectsContainer) return;
      
      // Get all growing clovers (with stems)
      const growingClovers = cloverEffectsContainer.querySelectorAll('.growing-clover');
      growingClovers.forEach(clover => {
        const rect = clover.getBoundingClientRect();
        const videoRect = cameraVideo.getBoundingClientRect();
        
        // Convert to normalized coordinates (0-1 range)
        const normalizedX = (rect.left - videoRect.left) / videoRect.width;
        const normalizedY = (rect.top - videoRect.top) / videoRect.height;
        const normalizedWidth = rect.width / videoRect.width;
        const normalizedHeight = rect.height / videoRect.height;
        
        // Store collider with some padding for better collision detection
        cloverColliders.push({
          x: normalizedX,
          y: normalizedY,
          width: normalizedWidth,
          height: normalizedHeight,
          top: normalizedY,
          bottom: normalizedY + normalizedHeight,
          left: normalizedX,
          right: normalizedX + normalizedWidth,
          centerX: normalizedX + normalizedWidth / 2,
          type: 'growing'
        });
      });
      
      // Get all animated clovers (without stems)
      const animatedClovers = cloverEffectsContainer.querySelectorAll('.animated-clover');
      animatedClovers.forEach(clover => {
        const rect = clover.getBoundingClientRect();
        const videoRect = cameraVideo.getBoundingClientRect();
        
        // Convert to normalized coordinates
        const normalizedX = (rect.left - videoRect.left) / videoRect.width;
        const normalizedY = (rect.top - videoRect.top) / videoRect.height;
        const normalizedWidth = rect.width / videoRect.width;
        const normalizedHeight = rect.height / videoRect.height;
        
        cloverColliders.push({
          x: normalizedX,
          y: normalizedY,
          width: normalizedWidth,
          height: normalizedHeight,
          top: normalizedY,
          bottom: normalizedY + normalizedHeight,
          left: normalizedX,
          right: normalizedX + normalizedWidth,
          centerX: normalizedX + normalizedWidth / 2,
          type: 'animated'
        });
      });
    }
    
    // Check if particle is colliding with a clover and adjust trajectory
    function handleParticleCloverCollision(particle) {
      if (cloverColliders.length === 0) return;
      
      for (const clover of cloverColliders) {
        // Check if particle is within horizontal bounds of clover
        if (particle.x >= clover.left - 0.01 && particle.x <= clover.right + 0.01) {
          // Check if particle is entering the clover from above
          if (particle.y >= clover.top - 0.02 && particle.y <= clover.top + 0.03) {
            // Particle hit the top of the clover - make it slide down
            
            // Determine which side of the clover center the particle is on
            const distanceFromCenter = particle.x - clover.centerX;
            
            // Add horizontal velocity away from center to simulate sliding
            if (distanceFromCenter < 0) {
              // Left side - slide left
              particle.vx -= 0.002;
            } else {
              // Right side - slide right
              particle.vx += 0.002;
            }
            
            // Slow down vertical movement while on clover surface
            particle.vy *= 0.5;
            
            // Mark particle as "on clover" to track state
            if (!particle.onClover) {
              particle.onClover = true;
              particle.cloverEntryTime = Date.now();
            }
            
            return; // Only collide with one clover at a time
          }
          
          // If particle is already on clover, continue sliding
          if (particle.onClover && particle.y >= clover.top && particle.y <= clover.bottom) {
            // Maintain sliding motion
            const distanceFromCenter = particle.x - clover.centerX;
            
            // Continue pushing away from center
            if (distanceFromCenter < 0) {
              particle.vx -= 0.001;
            } else {
              particle.vx += 0.001;
            }
            
            // Gradually restore normal falling speed
            particle.vy = Math.min(particle.vy + 0.0001, 0.003);
            
            return;
          }
          
          // Check if particle has exited the clover
          if (particle.onClover && particle.y > clover.bottom) {
            particle.onClover = false;
            // Restore normal gravity
            particle.vy = Math.max(particle.vy, 0.001);
          }
        }
      }
    }
    
    if (clickableDewdrop && photoboothModal) {
      console.log('Photo Booth elements found');
      
      // Open Photo Booth when dewdrop is clicked
      clickableDewdrop.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent triggering leaf hover
        console.log('Dewdrop clicked - opening Photo Booth');
        photoboothModal.style.display = 'block';
        startCamera();
      });
      
      // Close Photo Booth when X is clicked
      if (closePhotobooth) {
        closePhotobooth.addEventListener('click', function() {
          console.log('Close Photo Booth button clicked');
          photoboothModal.style.display = 'none';
          stopCamera();
        });
      }
      
      // Close Photo Booth when clicking outside the content
      photoboothModal.addEventListener('click', function(event) {
        if (event.target === photoboothModal) {
          console.log('Clicked outside Photo Booth - closing');
          photoboothModal.style.display = 'none';
          stopCamera();
        }
      });
      
      // Capture photo button
      if (captureBtn) {
        captureBtn.addEventListener('click', function() {
          console.log('Capture button clicked');
          capturePhoto();
        });
      }
    } else {
      console.error('Photo Booth elements not found');
    }
    
    // Initialize MediaPipe models (NEW Tasks Vision API)
    async function initializeMediaPipe() {
      console.log('Initializing MediaPipe Tasks Vision models...');
      
      try {
        let visionModule;
        
        // Use the already-loaded module from HTML <script type="module"> first (works with file:// protocol)
        if (window.MediaPipeVision) {
          console.log('Using pre-loaded MediaPipe Vision module from HTML script tag');
          visionModule = window.MediaPipeVision;
        } else {
          console.log('Loading MediaPipe Tasks Vision from CDN via dynamic import...');
          // Dynamic import only works from http(s)://, not file://
          visionModule = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/vision_bundle.mjs');
          console.log('MediaPipe Tasks Vision module loaded via dynamic import');
        }
        
        const { FilesetResolver, HandLandmarker, FaceLandmarker } = visionModule;
        console.log('MediaPipe Tasks Vision module loaded');
        
        // Initialize the WASM fileset resolver
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
        );
        console.log('MediaPipe WASM runtime initialized');
        
        // Initialize Hand Landmarker for hand tracking (try GPU first, fall back to CPU)
        try {
          handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
              delegate: 'GPU'
            },
            runningMode: 'VIDEO',
            numHands: 2
          });
          console.log('Hand Landmarker initialized successfully (GPU)');
        } catch (e) {
          console.warn('GPU Hand Landmarker failed, trying CPU:', e.message);
          try {
            handLandmarker = await HandLandmarker.createFromOptions(vision, {
              baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
                delegate: 'CPU'
              },
              runningMode: 'VIDEO',
              numHands: 2
            });
            console.log('Hand Landmarker initialized successfully (CPU fallback)');
          } catch (e2) {
            console.error('Failed to initialize Hand Landmarker (both GPU and CPU):', e2);
            handLandmarker = null;
          }
        }
        
        // Initialize Face Landmarker for face/eye tracking (try GPU first, fall back to CPU)
        try {
          faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',
              delegate: 'GPU'
            },
            runningMode: 'VIDEO',
            numFaces: 1,
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: true
          });
          console.log('Face Landmarker initialized successfully (GPU)');
        } catch (e) {
          console.warn('GPU Face Landmarker failed, trying CPU:', e.message);
          try {
            faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
              baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',
                delegate: 'CPU'
              },
              runningMode: 'VIDEO',
              numFaces: 1,
              outputFaceBlendshapes: true,
              outputFacialTransformationMatrixes: true
            });
            console.log('Face Landmarker initialized successfully (CPU fallback)');
          } catch (e2) {
            console.error('Failed to initialize Face Landmarker (both GPU and CPU):', e2);
            faceLandmarker = null;
          }
        }
        
        if (handLandmarker || faceLandmarker) {
          console.log('MediaPipe models initialized successfully');
        } else {
          console.error('All MediaPipe models failed to initialize - gesture interaction will not work');
        }
      } catch (error) {
        console.error('Failed to initialize MediaPipe Tasks Vision:', error);
        console.log('This may be due to network issues loading from CDN');
        console.log('Gesture interaction unavailable');
      }
    }
    
    // Process video frame for gesture detection
    async function processFrame() {
      if (!isTrackingActive || !cameraVideo || cameraVideo.ended) {
        return;
      }
      
      // If video is not playing yet, keep retrying instead of stopping the loop
      if (cameraVideo.paused || cameraVideo.readyState < 2 || cameraVideo.videoWidth === 0) {
        requestAnimationFrame(processFrame);
        return;
      }
      
      const timestamp = performance.now();
      
      try {
        const promises = [];
        
        // Use Hand Landmarker to detect hands
        if (handLandmarker) {
          promises.push(
            (async () => {
              try {
                const result = handLandmarker.detectForVideo(cameraVideo, timestamp);
                onHandResults(result);
              } catch (e) {
                console.error('Hand detection frame error:', e);
              }
            })()
          );
        }
        
        // Use Face Landmarker to detect face
        if (faceLandmarker) {
          promises.push(
            (async () => {
              try {
                const result = faceLandmarker.detectForVideo(cameraVideo, timestamp);
                onFaceResults(result);
              } catch (e) {
                console.error('Face detection frame error:', e);
              }
            })()
          );
        }
        
        // Wait for both detections to complete this frame
        await Promise.all(promises);
      } catch (error) {
        console.error('Error processing frame:', error);
      }
      
      // Continue processing frames
      requestAnimationFrame(processFrame);
    }
    
    // Camera functions
    async function startCamera() {
      const loadingIndicator = document.getElementById('camera-loading');
      
      try {
        console.log('Requesting camera access...');
        
        // Show loading indicator
        if (loadingIndicator) {
          loadingIndicator.classList.remove('hidden');
        }
        
        // Request camera with flexible constraints for broad compatibility
        cameraStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          }, 
          audio: false 
        });
        
        cameraVideo.srcObject = cameraStream;
        
        // IMPORTANT: Set event handlers BEFORE play() to avoid race condition
        // where loadedmetadata fires before the handler is registered
        
        let trackingStarted = false;
        
        async function startTracking() {
          if (trackingStarted) return;
          trackingStarted = true;
          
          console.log(`Starting gesture tracking: ${cameraVideo.videoWidth || 'unknown'}x${cameraVideo.videoHeight || 'unknown'}`);
          
          // Hide loading indicator when video is ready
          if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
          }
          
          // Initialize MediaPipe and start tracking
          try {
            await initializeMediaPipe();
            isTrackingActive = true;
            // Start processing frames with a small delay to ensure video is playing
            setTimeout(() => processFrame(), 100);
            console.log('Gesture tracking started successfully');
          } catch (initError) {
            console.error('Failed to initialize MediaPipe models:', initError);
            console.log('Gesture interaction unavailable - MediaPipe models could not be loaded');
            console.log('Check browser DevTools > Network tab to see if CDN files are loading');
            // Still show the camera, just without gesture effects
          }
        }
        
        // Method 1: Primary - loadedmetadata event
        cameraVideo.onloadedmetadata = function() {
          console.log(`Camera loaded metadata: ${cameraVideo.videoWidth}x${cameraVideo.videoHeight}`);
          startTracking();
        };
        
        // Method 2: Fallback - playing event (some browsers need this)
        cameraVideo.onplaying = function() {
          console.log('Camera video playing');
          // Only start if not already started by loadedmetadata
          if (!trackingStarted && cameraVideo.readyState >= 1) {
            startTracking();
          }
        };
        
        // Method 3: Emergency timeout fallback - force start after 3 seconds
        setTimeout(function() {
          if (!trackingStarted) {
            console.warn('Camera events did not fire in time, forcing gesture tracking start');
            startTracking();
          }
        }, 3000);
        
        // Start playing the video
        const playPromise = cameraVideo.play();
        if (playPromise) {
          playPromise.catch(function(error) {
            console.error('Error playing camera video:', error);
          });
        }
        
        console.log('Camera started successfully');
      } catch (error) {
        console.error('Error accessing camera:', error);
        
        // Hide loading indicator on error
        if (loadingIndicator) {
          loadingIndicator.classList.add('hidden');
        }
        
        // Provide specific error messages
        if (error.name === 'NotAllowedError') {
          alert('Camera permission denied. Please allow camera access to use the Photo Booth.');
        } else if (error.name === 'NotFoundError') {
          alert('No camera found. Please connect a camera and try again.');
        } else if (error.name === 'NotReadableError') {
          alert('Camera is already in use by another application. Please close other apps using the camera.');
        } else {
          alert('Unable to access camera. Please check your camera settings and permissions.');
        }
      }
    }
    
    function stopCamera() {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
      }
      isTrackingActive = false;
      
      // Reset MediaPipe processing flags so models reinitialize on next open
      window.handsProcessed = false;
      window.faceMeshProcessed = false;
      
      // Clear any particles from previous session
      blinkParticles = [];
      rippleParticles = [];
      starParticles = [];
      
      // Reset gesture states
      openPalmWaveState = 'none';
      indexFingerClickState = 'none';
      previousIndexFingerPosition = null;
      indexFingerVelocityHistory = [];
      
      if (window.previousFingerPositions) {
        window.previousFingerPositions = [];
      }
      
      // Remove any leftover clover effects
      if (cloverEffectsContainer) {
        cloverEffectsContainer.innerHTML = '';
      }
      
      // Clear gesture canvas
      if (gestureCanvas) {
        const ctx = gestureCanvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, gestureCanvas.width, gestureCanvas.height);
      }
      
      console.log('Camera stopped and state cleaned');
    }
    
    function capturePhoto() {
      if (!cameraVideo || !photoCanvas) {
        console.error('Video or canvas element not found');
        return;
      }
      
      console.log('Capturing photo...');
      
      // Update clover colliders before capturing to ensure accurate positions
      updateCloverColliders();
      
      // Set canvas size to match video
      photoCanvas.width = cameraVideo.videoWidth;
      photoCanvas.height = cameraVideo.videoHeight;
      
      const ctx = photoCanvas.getContext('2d');
      
      // Mirror the image to match the preview
      ctx.translate(photoCanvas.width, 0);
      ctx.scale(-1, 1);
      
      // Draw video frame to canvas
      ctx.drawImage(cameraVideo, 0, 0, photoCanvas.width, photoCanvas.height);
      
      // Reset transform for overlay elements
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      
      // Collect all async drawing promises
      const drawPromises = [];
      
      // STEP 1: Draw growing clovers (with stems)
      const growingClovers = cloverEffectsContainer.querySelectorAll('.growing-clover');
      if (growingClovers.length > 0) {
        console.log(`Drawing ${growingClovers.length} growing clovers to canvas`);
        
        growingClovers.forEach(clover => {
          const rect = clover.getBoundingClientRect();
          const videoRect = cameraVideo.getBoundingClientRect();
          
          // Calculate position relative to video - NEED TO MIRROR X POSITION
          const x = (videoRect.right - rect.right) / videoRect.width * photoCanvas.width;
          const y = (rect.top - videoRect.top) / videoRect.height * photoCanvas.height;
          const width = rect.width / videoRect.width * photoCanvas.width;
          const height = rect.height / videoRect.height * photoCanvas.height;
          
          // Get clover color
          let color = '#3fc43b'; // default green (H125 S84 V77)
          if (clover.classList.contains('blue')) color = '#4488cc';
          else if (clover.classList.contains('yellow')) color = '#eebb22';
          
          // Convert SVG to image and draw on canvas
          const svgElement = clover.querySelector('svg');
          if (svgElement) {
            const promise = new Promise((resolve) => {
              const svgData = new XMLSerializer().serializeToString(svgElement);
              const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
              const url = URL.createObjectURL(svgBlob);
              
              const img = new Image();
              img.onload = function() {
                ctx.drawImage(img, x, y, width, height);
                URL.revokeObjectURL(url);
                resolve();
              };
              img.onerror = function() {
                console.error('Failed to load clover image');
                URL.revokeObjectURL(url);
                resolve(); // Resolve anyway to not block the process
              };
              img.src = url;
            });
            drawPromises.push(promise);
          }
        });
      }
      
      // STEP 2: Draw animated clovers (with proper SVG rendering)
      const activeClovers = cloverEffectsContainer.querySelectorAll('.animated-clover');
      if (activeClovers.length > 0) {
        console.log(`Drawing ${activeClovers.length} animated clovers to canvas`);
        
        activeClovers.forEach(clover => {
          const rect = clover.getBoundingClientRect();
          const videoRect = cameraVideo.getBoundingClientRect();
          
          // Calculate position relative to video - NEED TO MIRROR X POSITION
          const x = (videoRect.right - rect.right) / videoRect.width * photoCanvas.width;
          const y = (rect.top - videoRect.top) / videoRect.height * photoCanvas.height;
          const width = rect.width / videoRect.width * photoCanvas.width;
          const height = rect.height / videoRect.height * photoCanvas.height;
          
          // Convert SVG to image and draw on canvas
          const svgElement = clover.querySelector('svg');
          if (svgElement) {
            const promise = new Promise((resolve) => {
              const svgData = new XMLSerializer().serializeToString(svgElement);
              const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
              const url = URL.createObjectURL(svgBlob);
              
              const img = new Image();
              img.onload = function() {
                ctx.drawImage(img, x, y, width, height);
                URL.revokeObjectURL(url);
                resolve();
              };
              img.onerror = function() {
                console.error('Failed to load clover image');
                URL.revokeObjectURL(url);
                resolve(); // Resolve anyway to not block the process
              };
              img.src = url;
            });
            drawPromises.push(promise);
          }
        });
      }
      
      // STEP 3: Draw blink particles (synchronous, no promise needed)
      if (blinkParticles && blinkParticles.length > 0) {
        console.log(`Drawing ${blinkParticles.length} blink particles to canvas`);
        
        blinkParticles.forEach(particle => {
          // Only draw visible particles (opacity > 0.1)
          if (particle.opacity < 0.1) return;
          
          // Convert normalized coordinates to canvas coordinates
          const canvasX = particle.x * photoCanvas.width;
          const canvasY = particle.y * photoCanvas.height;
          
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          
          if (particle.type === 'dot') {
            // Glowing dot
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            
            // Add glow effect
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 15;
            ctx.fill();
          } else {
            // Water drop shape
            ctx.beginPath();
            ctx.moveTo(canvasX, canvasY - particle.size);
            ctx.bezierCurveTo(
              canvasX - particle.size, canvasY,
              canvasX - particle.size, canvasY + particle.size,
              canvasX, canvasY + particle.size * 1.5
            );
            ctx.bezierCurveTo(
              canvasX + particle.size, canvasY + particle.size,
              canvasX + particle.size, canvasY,
              canvasX, canvasY - particle.size
            );
            ctx.fillStyle = particle.color;
            
            // Add glow effect
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 10;
            ctx.fill();
          }
          
          ctx.restore();
        });
      }
      
      // STEP 4: Draw colorful ripple particles (for open palm + finger wave gesture)
      if (rippleParticles && rippleParticles.length > 0) {
        console.log(`📸 Drawing ${rippleParticles.length} colorful ripple particles to canvas`);
        console.log('📊 First ripple particle sample:', JSON.stringify(rippleParticles[0], null, 2));
        console.log('🖼️ Photo canvas size:', photoCanvas.width, 'x', photoCanvas.height);
        
        const now = Date.now();
        let drawnCount = 0;
        let skippedCount = 0;
        
        rippleParticles.forEach((particle, index) => {
          // Only draw visible particles (check lifetime and opacity)
          const age = now - particle.createdAt;
          if (age < 0 || age > particle.lifetime) { 
            skippedCount++;
            return; 
          }
          
          const lifeProgress = age / particle.lifetime;
          
          // Calculate opacity based on life cycle
          let opacity;
          if (lifeProgress < 0.08) {
            opacity = lifeProgress / 0.08; // Fade in
          } else if (lifeProgress > 0.75) {
            opacity = 1 - ((lifeProgress - 0.75) / 0.25); // Fade out
          } else {
            opacity = 1;
          }
          
          if (opacity < 0.05) return; // Skip nearly invisible particles
          
          // Update position with floating animation - with safety checks
          const baseX = isFinite(particle.x) ? particle.x : 0.5;
          const baseY = isFinite(particle.y) ? particle.y : 0.5;
          const floatSpeed = isFinite(particle.floatSpeed) ? particle.floatSpeed : 0.003;
          const floatPhase = isFinite(particle.floatPhase) ? particle.floatPhase : 0;
          const floatAmplitude = isFinite(particle.floatAmplitude) ? particle.floatAmplitude : 0.015;
          const driftAngle = isFinite(particle.driftAngle) ? particle.driftAngle : 0;
          const driftSpeed = isFinite(particle.driftSpeed) ? particle.driftSpeed : 0.0008;
          
          let currentX = baseX + Math.sin(now * floatSpeed + floatPhase) * floatAmplitude;
          let currentY = baseY + Math.cos(now * floatSpeed * 0.7 + floatPhase) * floatAmplitude;
          
          // Apply slow drift
          currentX += Math.cos(driftAngle) * driftSpeed * (age / 1000);
          currentY += Math.sin(driftAngle) * driftSpeed * (age / 1000);
          
          // Safety clamp to valid range (0-1)
          currentX = Math.max(0, Math.min(1, currentX));
          currentY = Math.max(0, Math.min(1, currentY));
          
          // Convert normalized coordinates to canvas coordinates
          const canvasWidth = isFinite(photoCanvas.width) && photoCanvas.width > 0 ? photoCanvas.width : 1280;
          const canvasHeight = isFinite(photoCanvas.height) && photoCanvas.height > 0 ? photoCanvas.height : 720;
          const canvasX = currentX * canvasWidth;
          const canvasY = currentY * canvasHeight;
          
          // Calculate size with twinkle effect
          const baseSize = Math.min(canvasWidth, canvasHeight) * 0.02;
          const twinkleSpeed = isFinite(particle.twinkleSpeed) ? particle.twinkleSpeed : 0.008;
          const twinkle = 1 + Math.sin(now * twinkleSpeed) * 0.25;
          
          // Use particle.size (the actual property name from creation)
          const particleBaseSize = particle.size || (Math.random() * 8 + 6); // Fallback: 6-14px
          const currentSize = baseSize * (particleBaseSize / 10) * twinkle * (1 - lifeProgress * 0.2);
          
          // Safety checks - skip invalid particles
          if (!isFinite(currentSize) || !isFinite(canvasX) || !isFinite(canvasY)) {
            console.warn('Skipping invalid ripple particle:', { currentSize, canvasX, canvasY });
            return;
          }
          
          if (currentSize < 1 || opacity < 0.05) return; // Skip too small or invisible particles
          
          ctx.save();
          ctx.globalAlpha = opacity;
          
          // Draw solid color circle (no white center, as requested)
          ctx.beginPath();
          
          try {
            const gradient = ctx.createRadialGradient(
              Math.max(0, Math.min(canvasX, photoCanvas.width)), 
              Math.max(0, Math.min(canvasY, photoCanvas.height)), 
              0, 
              Math.max(0, Math.min(canvasX, photoCanvas.width)), 
              Math.max(0, Math.min(canvasY, photoCanvas.height)), 
              Math.max(1, currentSize)
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.85, particle.color);
            gradient.addColorStop(1, particle.color + '00');
            
            ctx.fillStyle = gradient;
            ctx.arc(
              Math.max(0, Math.min(canvasX, photoCanvas.width)), 
              Math.max(0, Math.min(canvasY, photoCanvas.height)), 
              Math.max(1, currentSize), 
              0, Math.PI * 2
            );
            ctx.fill();
            
            // Subtle glow
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 8;
            ctx.fill();
          } catch (e) {
            console.warn('Error drawing ripple particle (non-critical):', e);
          }
          
          ctx.restore();
          
          drawnCount++;
        });
        
        console.log(`✅ Ripple particles result: ${drawnCount} drawn, ${skippedCount} skipped`);
      } else {
        console.log('⚠️ No ripple particles available for photo');
      }
      
      // STEP 5: Draw star particles (for index finger click gesture)
      if (starParticles && starParticles.length > 0) {
        console.log(`Drawing ${starParticles.length} star particles to canvas`);
        
        const now = Date.now();
        
        starParticles.forEach(particle => {
          // Check visibility
          const age = now - particle.createdAt;
          if (age < 0 || age > particle.lifetime) return;
          
          const lifeProgress = age / particle.lifetime;
          
          // Calculate opacity
          let opacity;
          if (lifeProgress < 0.1) {
            opacity = lifeProgress / 0.1;
          } else if (lifeProgress > 0.7) {
            opacity = 1 - ((lifeProgress - 0.7) / 0.3);
          } else {
            opacity = 1;
          }
          
          if (opacity < 0.05) return;
          
          // Update position
          let currentX = particle.x + particle.vx * (age / 16); // Approximate position based on velocity
          let currentY = particle.y + particle.vy * (age / 16);
          
          // Apply deceleration approximation
          const decelFactor = Math.pow(0.98, age / 16);
          currentX = particle.x + (particle.vx * (age / 16)) * decelFactor;
          currentY = particle.y + (particle.vy * (age / 16)) * decelFactor;
          
          // Convert to canvas coordinates
          const canvasX = currentX * photoCanvas.width;
          const canvasY = currentY * photoCanvas.height;
          
          // Safety checks for star particles
          if (!isFinite(canvasX) || !isFinite(canvasY)) {
            console.warn('Skipping invalid star particle:', { canvasX, canvasY });
            return;
          }
          
          ctx.save();
          ctx.globalAlpha = opacity;
          
          try {
            if (particle.type === 'star') {
              // Draw 5-pointed star
              const rotation = particle.rotation + particle.rotationSpeed * (age / 16);
              const pulse = 1 + Math.sin(now * 0.01) * 0.15;
              const currentSize = particle.size * pulse * (1 - lifeProgress * 0.3);
              
              if (!isFinite(currentSize) || currentSize < 2) {
                ctx.restore();
                return;
              }
              
              drawStarShape(
                ctx, 
                Math.max(0, Math.min(canvasX, photoCanvas.width)), 
                Math.max(0, Math.min(canvasY, photoCanvas.height)), 
                Math.max(2, currentSize), 
                rotation || 0, 
                particle.color
              );
              
            } else if (particle.type === 'sparkle') {
              // Draw sparkle dot
              const twinkle = 0.5 + Math.abs(Math.sin(now * particle.twinkleSpeed)) * 0.5;
              const currentSize = particle.size * twinkle;
              
              if (!isFinite(currentSize) || currentSize < 1) {
                ctx.restore();
                return;
              }
              
              ctx.beginPath();
              ctx.fillStyle = particle.color;
              ctx.shadowColor = particle.color;
              ctx.shadowBlur = 10;
              ctx.arc(
                Math.max(0, Math.min(canvasX, photoCanvas.width)), 
                Math.max(0, Math.min(canvasY, photoCanvas.height)), 
                Math.max(1, currentSize), 
                0, Math.PI * 2
              );
              ctx.fill();
            }
          } catch (e) {
            console.warn('Error drawing star particle (non-critical):', e);
          }
          
          ctx.restore();
        });
      }
      
      // STEP 6: Wait for all async drawings to complete, then generate and download image
      Promise.all(drawPromises).then(() => {
        // Additional delay to ensure all rendering is complete
        setTimeout(() => {
          const imageDataURL = photoCanvas.toDataURL('image/png');
          const link = document.createElement('a');
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          link.download = `photobooth-${timestamp}.png`;
          link.href = imageDataURL;
          link.click();
          
          console.log('Photo saved with all effects!');
          alert('Photo saved to your downloads!');
        }, 100);
      });
    }
    
    // Handle hand detection results (NEW Tasks Vision API)
    function onHandResults(result) {
      try {
        const ctx = gestureCanvas.getContext('2d');
        ctx.clearRect(0, 0, gestureCanvas.width, gestureCanvas.height);
        
        // Set canvas size to match video
        if (gestureCanvas.width !== cameraVideo.videoWidth || gestureCanvas.height !== cameraVideo.videoHeight) {
          gestureCanvas.width = cameraVideo.videoWidth;
          gestureCanvas.height = cameraVideo.videoHeight;
        }
        
        // In the new API, landmarks are in result.landmarks (array of arrays)
        // Old API used result.multiHandLandmarks
        const landmarksList = result.landmarks;
        
        // Get handedness information for left/right hand detection
        const handednessList = result.handedness || result.handednesses || [];
        
        if (landmarksList && landmarksList.length > 0) {
          for (let idx = 0; idx < landmarksList.length; idx++) {
            const landmarks = landmarksList[idx];
            
            // Determine if this is left or right hand (for logging only)
            let isRightHand = true;
            if (handednessList && handednessList[idx]) {
              const handedness = handednessList[idx];
              if (handedness.categoryName === 'Left' || handedness[0]?.categoryName === 'Left') {
                isRightHand = false;
              }
            }
            
            // Store hand info for gesture detection (not used for mirroring anymore)
            window.currentHandIsRight = isRightHand;
            
            // Track hand position for clover spawning (use wrist landmark 0)
            const wrist = landmarks[0];
            window.lastHandPosition = { x: wrist.x, y: wrist.y };
            
            // Draw hand landmarks for debugging (wrap in try-catch to prevent breaking gesture detection)
            try {
              if (typeof window.drawConnectors === 'function' && typeof window.HAND_CONNECTIONS !== 'undefined') {
                window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, {color: '#B8A9E8', lineWidth: 2});
              }
              if (typeof window.drawLandmarks === 'function') {
                window.drawLandmarks(ctx, landmarks, {color: '#FFB6C1', lineWidth: 1, radius: 3});
              }
            } catch (e) {
              console.warn('Drawing utils error (non-critical):', e);
            }
            
            // Calculate and display finger ratio for debugging
            try {
              const fingerRatio = calculateFingerExtensionRatio(landmarks);
              ctx.save();
              ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
              ctx.font = '16px Arial';
              ctx.fillStyle = '#FFFFFF';
              ctx.fillText(`Finger Ratio: ${fingerRatio.toFixed(2)} | State: ${fistState}`, 10, 30);
              ctx.restore();
            } catch (e) {
              console.warn('Debug text error (non-critical):', e);
            }
            
            // Detect gestures - CRITICAL: always call regardless of drawing errors
            try {
              detectHandGestures(landmarks);
            } catch (e) {
              console.error('Gesture detection error:', e);
            }
          }
          
          // Update and draw colorful ripple particles (MUST be here in hand results, not face results!)
          try {
            updateAndDrawRippleParticles(ctx);
          } catch (e) {
            console.warn('Ripple particles error (non-critical):', e);
          }
        } else {
          // No hands detected, reset state
          if (fistState !== 'none') {
            fistState = 'none';
          }
          if (pinchState !== 'none') {
            pinchState = 'none';
          }
          if (openPalmWaveState !== 'none') {
            openPalmWaveState = 'none';
          }
          if (indexFingerClickState !== 'none') {
            indexFingerClickState = 'none';
            previousIndexFingerPosition = null;
            indexFingerVelocityHistory = [];
          }
        }
        
        // Always draw ripple particles even when no hand detected (so existing particles continue to animate)
        try {
          const ctxForRipple = gestureCanvas.getContext('2d');
          updateAndDrawRippleParticles(ctxForRipple);
        } catch (e) {
          console.warn('Ripple particles (no hand) error (non-critical):', e);
        }
        
        // Always draw star particles
        try {
          const ctxForStar = gestureCanvas.getContext('2d');
          updateAndDrawStarParticles(ctxForStar);
        } catch (e) {
          console.warn('Star particles error (non-critical):', e);
        }
      } catch (e) {
        console.error('onHandResults error:', e);
      }
    }
    
    // Handle face detection results (NEW Tasks Vision API)
    function onFaceResults(result) {
      try {
        // In the new API, face landmarks are in result.faceLandmarks (array of arrays)
        // Old API used result.multiFaceLandmarks
        const faceLandmarksList = result.faceLandmarks;
        
        if (faceLandmarksList && faceLandmarksList.length > 0) {
          const faceLandmarks = faceLandmarksList[0];
          
          // Calculate EAR for debugging display
          const leftEAR = calculateEyeAspectRatio(faceLandmarks, [33, 160, 158, 133, 153, 144]);
          const rightEAR = calculateEyeAspectRatio(faceLandmarks, [362, 385, 387, 263, 373, 380]);
          const avgEAR = (leftEAR + rightEAR) / 2;
          
          // Display EAR value on canvas
          const ctx = gestureCanvas.getContext('2d');
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
          ctx.font = '16px Arial';
          ctx.fillStyle = '#00FFFF';
          ctx.fillText(`EAR: ${avgEAR.toFixed(3)} | Blink Cooldown: ${Math.max(0, ((lastBlinkTime + blinkCooldown) - Date.now()) / 1000).toFixed(1)}s`, 10, 60);
          ctx.restore();
          
          // Detect blink and create particle effects
          try {
            detectBlink(faceLandmarks);
          } catch (e) {
            console.warn('Blink detection error (non-critical):', e);
          }
          
          // Update and draw blink particles
          try {
            updateAndDrawBlinkParticles(faceLandmarks, ctx);
          } catch (e) {
            console.warn('Blink particles error (non-critical):', e);
          }
        }
      } catch (e) {
        console.error('onFaceResults error:', e);
      }
    }
    
    // Detect blink using eye aspect ratio with enhanced accuracy
    function detectBlink(landmarks) {
      const now = Date.now();
      
      // Eye landmarks for MediaPipe Face Mesh
      // Left eye: 33, 160, 158, 133, 153, 144
      // Right eye: 362, 385, 387, 263, 373, 380
      
      const leftEAR = calculateEyeAspectRatio(landmarks, [33, 160, 158, 133, 153, 144]);
      const rightEAR = calculateEyeAspectRatio(landmarks, [362, 385, 387, 263, 373, 380]);
      
      const avgEAR = (leftEAR + rightEAR) / 2;
      
      // Add to history
      earHistory.push(avgEAR);
      if (earHistory.length > EAR_HISTORY_SIZE) {
        earHistory.shift();
      }
      
      // Calculate average EAR from history
      const avgHistoricalEAR = earHistory.reduce((sum, val) => sum + val, 0) / earHistory.length;
      
      // EAR threshold for blink detection
      const EAR_THRESHOLD = 0.23; // Slightly lowered for better sensitivity
      const BLINK_DETECTION_FRAMES = 3; // Need consecutive low EAR values
      
      // Check if we have enough history and recent EAR values are consistently low
      const recentLowEAR = earHistory.slice(-BLINK_DETECTION_FRAMES).every(ear => ear < EAR_THRESHOLD);
      
      // Also check that we had higher EAR before (eye was open)
      const wasOpen = earHistory.length >= BLINK_DETECTION_FRAMES && 
                     earHistory[earHistory.length - BLINK_DETECTION_FRAMES - 1] > EAR_THRESHOLD + 0.05;
      
      if (recentLowEAR && wasOpen && (now - lastBlinkTime) > blinkCooldown) {
        console.log(`Blink detected! EAR: ${avgEAR.toFixed(3)} (threshold: ${EAR_THRESHOLD})`);
        
        // Create particle effects instead of showing clover
        createBlinkParticles(landmarks);
        
        lastBlinkTime = now;
        
        // Reset history after detection
        earHistory = [];
      }
    }
    
    // Create glowing particles when blink is detected
    function createBlinkParticles(landmarks) {
      const now = Date.now();
      
      // Get eye positions
      const leftEyeCenter = landmarks[468]; // Left eye center
      const rightEyeCenter = landmarks[473]; // Right eye center
      
      // Create MORE particles falling from each eye (increased from 8 to 20)
      const particleCount = 20; // More particles for richer effect
      
      for (let i = 0; i < particleCount; i++) {
        // Stagger the creation time - particles appear over 500ms period
        const staggerDelay = Math.random() * 500; // Random delay between 0-500ms
        
        // Left eye particles - more spread out with wind-like drift
        blinkParticles.push({
          x: leftEyeCenter.x + (Math.random() - 0.5) * 0.08, // Wider horizontal spread
          y: leftEyeCenter.y + (Math.random() - 0.5) * 0.01, // Slight vertical offset at start
          vx: (Math.random() - 0.5) * 0.003, // More horizontal drift
          vy: Math.random() * 0.002 + 0.001, // Slower, more graceful fall
          size: Math.random() * 4 + 3, // Keep same size range
          type: Math.random() > 0.5 ? 'dot' : 'drop',
          opacity: 0, // Start invisible
          createdAt: now + staggerDelay, // Staggered creation time
          lifetime: 999999999, // Effectively infinite - particles won't expire
          color: Math.random() > 0.5 ? '#a8d8ea' : '#ffffff', // Light blue or white
          settled: false, // Track if particle has reached bottom
          windPhase: Math.random() * Math.PI * 2, // Random phase for wind oscillation
          windAmplitude: Math.random() * 0.002 + 0.001 // Individual wind variation
        });
        
        // Right eye particles - more spread out with wind-like drift
        blinkParticles.push({
          x: rightEyeCenter.x + (Math.random() - 0.5) * 0.08, // Wider horizontal spread
          y: rightEyeCenter.y + (Math.random() - 0.5) * 0.01, // Slight vertical offset at start
          vx: (Math.random() - 0.5) * 0.003, // More horizontal drift
          vy: Math.random() * 0.002 + 0.001, // Slower, more graceful fall
          size: Math.random() * 4 + 3, // Keep same size range
          type: Math.random() > 0.5 ? 'dot' : 'drop',
          opacity: 0, // Start invisible
          createdAt: now + staggerDelay, // Staggered creation time
          lifetime: 999999999, // Effectively infinite - particles won't expire
          color: Math.random() > 0.5 ? '#a8d8ea' : '#ffffff',
          settled: false, // Track if particle has reached bottom
          windPhase: Math.random() * Math.PI * 2, // Random phase for wind oscillation
          windAmplitude: Math.random() * 0.002 + 0.001 // Individual wind variation
        });
      }
      
      console.log(`Created ${particleCount * 2} blink particles with staggered timing`);
    }
    
    // Update and draw blink particles
    function updateAndDrawBlinkParticles(faceLandmarks, ctx) {
      const now = Date.now();
      
      // Update clover colliders periodically (every 10 frames for performance)
      if (!window.colliderUpdateCounter) window.colliderUpdateCounter = 0;
      window.colliderUpdateCounter++;
      if (window.colliderUpdateCounter % 10 === 0) {
        updateCloverColliders();
      }
      
      // Don't filter out particles - they stay forever once created
      // Just update their positions
      
      // Calculate global wind effect (time-based oscillation)
      const time = now / 1000; // Convert to seconds
      const globalWindX = Math.sin(time * 0.5) * 0.001; // Gentle global wind oscillation
      const globalWindY = Math.cos(time * 0.3) * 0.0005; // Subtle vertical breeze
      
      // Update and draw each particle
      blinkParticles.forEach(particle => {
        // Check if particle should be visible yet (staggered timing)
        const age = now - particle.createdAt;
        
        if (age < 0) {
          // Particle hasn't been created yet (staggered timing)
          return;
        }
        
        // Fade in effect for newly created particles (first 200ms)
        if (age < 200) {
          particle.opacity = age / 200; // Gradual fade-in from 0 to 1
        } else if (!particle.settled) {
          // Fully visible during falling
          particle.opacity = 1;
        }
        
        // If particle hasn't settled yet, update position
        if (!particle.settled && age >= 0) {
          // Apply individual wind oscillation
          const individualWind = Math.sin(time * 1.5 + particle.windPhase) * particle.windAmplitude;
          
          // Check for clover collision before updating position
          handleParticleCloverCollision(particle);
          
          // Update position with wind effects
          particle.x += particle.vx + globalWindX + individualWind;
          particle.y += particle.vy + globalWindY;
          
          // Add very gentle gravity acceleration
          particle.vy += 0.00005;
          
          // Add slight horizontal drift variation over time
          particle.vx += (Math.random() - 0.5) * 0.0001;
          
          // Clamp horizontal velocity to prevent excessive drift
          particle.vx = Math.max(-0.005, Math.min(0.005, particle.vx));
          
          // Check if particle has reached bottom of screen (95% down)
          if (particle.y >= 0.95) {
            particle.y = 0.95; // Clamp to bottom
            particle.settled = true; // Mark as settled
            
            // Reduce opacity slightly when settled for softer look
            particle.opacity = 0.7;
          }
        } else if (particle.settled) {
          // Settled particles gently fade but remain visible
          particle.opacity = Math.max(0.3, particle.opacity - 0.001);
        }
        
        // Convert normalized coordinates to canvas coordinates
        const canvasX = particle.x * gestureCanvas.width;
        const canvasY = particle.y * gestureCanvas.height;
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'dot') {
          // Glowing dot
          ctx.beginPath();
          ctx.arc(canvasX, canvasY, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          
          // Add glow effect
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 15;
          ctx.fill();
        } else {
          // Water drop shape
          ctx.beginPath();
          ctx.moveTo(canvasX, canvasY - particle.size);
          ctx.bezierCurveTo(
            canvasX - particle.size, canvasY,
            canvasX - particle.size, canvasY + particle.size,
            canvasX, canvasY + particle.size * 1.5
          );
          ctx.bezierCurveTo(
            canvasX + particle.size, canvasY + particle.size,
            canvasX + particle.size, canvasY,
            canvasX, canvasY - particle.size
          );
          ctx.fillStyle = particle.color;
          
          // Add glow effect
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 10;
          ctx.fill();
        }
        
        ctx.restore();
      });
    }
    
    // Detect wave gesture by tracking hand position changes with enhanced accuracy
    function detectWaveGesture(landmarks, now) {
      // Use wrist position (landmark 0) to track movement
      const wrist = landmarks[0];
      const currentPosition = { x: wrist.x, y: wrist.y, timestamp: now };
      
      // Add to movement history
      handMovementHistory.push(currentPosition);
      if (handMovementHistory.length > MOVEMENT_HISTORY_SIZE) {
        handMovementHistory.shift();
      }
      
      // Need at least 5 positions to detect a wave pattern
      if (handMovementHistory.length < 5) {
        previousHandPosition = currentPosition;
        return;
      }
      
      // Calculate horizontal movement over recent frames
      const recentPositions = handMovementHistory.slice(-5);
      let totalHorizontalMovement = 0;
      let directionChanges = 0;
      let lastDirection = 0;
      
      for (let i = 1; i < recentPositions.length; i++) {
        const deltaX = recentPositions[i].x - recentPositions[i-1].x;
        totalHorizontalMovement += Math.abs(deltaX);
        
        // Track direction changes (positive to negative or vice versa)
        const currentDirection = deltaX > 0 ? 1 : -1;
        if (lastDirection !== 0 && currentDirection !== lastDirection) {
          directionChanges++;
        }
        lastDirection = currentDirection;
      }
      
      // Display wave detection info on canvas
      const ctx = gestureCanvas.getContext('2d');
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.font = '16px Arial';
      ctx.fillStyle = '#FFFF00';
      ctx.fillText(`Wave Movement: ${totalHorizontalMovement.toFixed(3)} | Changes: ${directionChanges}`, 10, 90);
      ctx.restore();
      
      // Wave detection criteria:
      // 1. Significant total horizontal movement (> 0.15 in normalized coordinates)
      // 2. At least 2 direction changes (indicating back-and-forth motion)
      // 3. Cooldown period respected
      const WAVE_MOVEMENT_THRESHOLD = 0.15;
      const MIN_DIRECTION_CHANGES = 2;
      
      if (totalHorizontalMovement > WAVE_MOVEMENT_THRESHOLD && 
          directionChanges >= MIN_DIRECTION_CHANGES && 
          (now - lastWaveTime) > waveCooldown) {
        console.log(`Wave detected! Movement: ${totalHorizontalMovement.toFixed(3)}, Direction changes: ${directionChanges}`);
        showCloverEffect('yellow');
        lastWaveTime = now;
        
        // Reset history after detection
        handMovementHistory = [];
      }
      
      previousHandPosition = currentPosition;
    }
    
    // Detect pinch gesture (index finger and thumb) for green clover
    function detectPinchGesture(landmarks, now) {
      // Get index finger tip (landmark 8) and thumb tip (landmark 4)
      const indexTip = landmarks[8];
      const thumbTip = landmarks[4];
      
      // Calculate distance between index and thumb tips
      const pinchDistance = distance(indexTip, thumbTip);
      
      // State machine for pinch detection
      switch (pinchState) {
        case 'none':
          // Check if fingers are pinching (distance < 0.05)
          if (pinchDistance < 0.05) {
            pinchState = 'pinching';
            console.log('Pinch forming... Distance:', pinchDistance.toFixed(3));
          }
          break;
          
        case 'pinching':
          // Check if fingers are separating (distance > 0.1) and cooldown has passed
          if (pinchDistance > 0.1 && (now - lastPinchTime) > pinchCooldown) {
            pinchState = 'separating';
            console.log('Pinch separating... Distance:', pinchDistance.toFixed(3));
          } else if (pinchDistance > 0.08) {
            // If not fully pinched anymore, reset
            pinchState = 'none';
            console.log('Pinch cancelled');
          }
          break;
          
        case 'separating':
          // Check if fully separated (distance > 0.15)
          if (pinchDistance > 0.15) {
            pinchState = 'none';
            console.log('Pinch released - triggering green clover!');
            // Pass the pinch position (midpoint between index and thumb)
            // IMPORTANT: Mirror the X coordinate to match the mirrored video display
            const pinchX = 1.0 - (indexTip.x + thumbTip.x) / 2; // Mirror X coordinate
            const pinchY = (indexTip.y + thumbTip.y) / 2;
            showGrowingCloverEffect('green', { x: pinchX, y: pinchY });
            lastPinchTime = now;
          } else if (pinchDistance < 0.05) {
            // If pinched again before fully separating, go back to pinching state
            pinchState = 'pinching';
            console.log('Pinch re-formed');
          }
          break;
      }
      
      // Display pinch state on canvas
      const ctx = gestureCanvas.getContext('2d');
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.font = '16px Arial';
      ctx.fillStyle = '#00FF00';
      ctx.fillText(`Pinch State: ${pinchState} | Distance: ${pinchDistance.toFixed(3)} | Cooldown: ${Math.max(0, ((lastPinchTime + pinchCooldown) - now) / 1000).toFixed(1)}s`, 10, 150);
      ctx.restore();
    }
    
    // Detect fist gesture by tracking finger extension ratio with proper state machine (for blue clover)
    function detectFistGesture(landmarks, now) {
      const fingerRatio = calculateFingerExtensionRatio(landmarks);
      
      // State machine for fist detection: none -> forming -> fist -> opening -> none
      switch (fistState) {
        case 'none':
          // Check if fingers are closing (ratio < 0.4)
          if (fingerRatio < 0.4) {
            fistState = 'forming';
            console.log('Fist forming... Ratio:', fingerRatio.toFixed(2));
          }
          break;
          
        case 'forming':
          // Check if fully closed (ratio < 0.35)
          if (fingerRatio < 0.35) {
            fistState = 'fist';
            console.log('Fist detected! Ratio:', fingerRatio.toFixed(2));
          } else if (fingerRatio > 0.7) {
            // If suddenly opened, reset
            fistState = 'none';
            console.log('Fist formation cancelled');
          }
          break;
          
        case 'fist':
          // Check if starting to open (ratio > 0.7) and cooldown has passed
          if (fingerRatio > 0.7 && (now - lastFistOpenTime) > fistOpenCooldown) {
            fistState = 'opening';
            console.log('Fist opening... Ratio:', fingerRatio.toFixed(2));
          }
          break;
          
        case 'opening':
          // Check if fully opened (ratio > 0.8)
          if (fingerRatio > 0.8) {
            fistState = 'none';
            console.log('Fist opened - triggering blue clover!');
            showCloverEffect('blue');
            lastFistOpenTime = now;
          } else if (fingerRatio < 0.35) {
            // If closed again before fully opening, go back to fist state
            fistState = 'fist';
            console.log('Fist re-closed');
          }
          break;
      }
      
      // Display fist state on canvas
      const ctx = gestureCanvas.getContext('2d');
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.font = '16px Arial';
      ctx.fillStyle = '#00FF00';
      ctx.fillText(`Fist State: ${fistState} | Ratio: ${fingerRatio.toFixed(2)} | Cooldown: ${Math.max(0, ((lastFistOpenTime + fistOpenCooldown) - now) / 1000).toFixed(1)}s`, 10, 120);
      ctx.restore();
    }
    
    // Detect open palm + finger wave gesture for colorful ripple particles
    function detectOpenPalmWaveGesture(landmarks, now) {
      // Get all finger tips and their bases for extension calculation
      const fingerTips = [8, 12, 16, 20]; // Index, Middle, Ring, Pinky tips
      const fingerBases = [5, 9, 13, 17]; // Corresponding finger bases
      const thumbTip = landmarks[4];
      const palmCenter = landmarks[0]; // Wrist as palm reference
      
      // Calculate average finger extension (excluding thumb)
      let totalExtension = 0;
      let fingersExtended = 0;
      
      for (let i = 0; i < fingerTips.length; i++) {
        const tip = landmarks[fingerTips[i]];
        const base = landmarks[fingerBases[i]];
        const palm = landmarks[0];
        
        const tipToPalm = distance(tip, palm);
        const baseToPalm = distance(base, palm);
        
        if (tipToPalm > baseToPalm * 1.3) {
          totalExtension += 1;
          fingersExtended++;
        }
      }
      
      // Check if thumb is also extended
      const thumbToPalm = distance(thumbTip, palmCenter);
      const thumbBase = landmarks[2];
      const thumbBaseToPalm = distance(thumbBase, palmCenter);
      const thumbExtended = thumbToPalm > thumbBaseToPalm * 1.2;
      
      // Palm is open if at least 4 fingers are extended and thumb is extended
      const isPalmOpen = fingersExtended >= 4 && thumbExtended;
      
      // Track fingertip movement for wave detection
      const currentFingerPositions = fingerTips.map(idx => ({
        x: landmarks[idx].x,
        y: landmarks[idx].y
      }));
      
      // Calculate finger movement variance (to detect waving)
      let fingerMovementVariance = 0;
      if (window.previousFingerPositions && window.previousFingerPositions.length > 0) {
        let totalMovement = 0;
        for (let i = 0; i < currentFingerPositions.length; i++) {
          const prev = window.previousFingerPositions[i];
          const curr = currentFingerPositions[i];
          const movement = Math.abs(curr.x - prev.x) + Math.abs(curr.y - prev.y);
          totalMovement += movement;
        }
        fingerMovementVariance = totalMovement / currentFingerPositions.length;
      }
      
      // Store current positions for next frame
      window.previousFingerPositions = currentFingerPositions;
      
      // State machine for open palm + finger wave detection
      switch (openPalmWaveState) {
        case 'none':
          // Check if palm is open with some finger movement
          if (isPalmOpen && fingerMovementVariance > 0.006) { // Lowered threshold from 0.008 to 0.006
            openPalmWaveState = 'detecting';
            console.log('✨ Open palm + finger wave detecting... Palm:', isPalmOpen, 'Variance:', fingerMovementVariance.toFixed(4), 'Fingers:', fingersExtended);
          }
          break;
          
        case 'detecting':
          // Continue detecting while palm is open and fingers are moving
          if (!isPalmOpen) {
            openPalmWaveState = 'none';
            console.log('Open palm cancelled - palm closed');
          } else if (fingerMovementVariance < 0.003) { // Lowered from 0.005 to 0.003
            // Movement too low, might be just holding hand still
            openPalmWaveState = 'none';
            console.log('Open palm cancelled - no movement');
          } else if (fingerMovementVariance > 0.01 && (now - lastOpenPalmWaveTime) > openPalmWaveCooldown) { // Lowered from 0.015 to 0.01
            // Significant waving detected!
            openPalmWaveState = 'triggered';
            console.log('🎆 Open palm + finger wave TRIGGERED! Variance:', fingerMovementVariance.toFixed(4));
            
            // Create colorful ripple particles from palm center
            createColorfulRippleParticles(landmarks);
            lastOpenPalmWaveTime = now;
            
            // Reset after short delay
            setTimeout(() => {
              openPalmWaveState = 'none';
            }, 500);
          }
          break;
          
        case 'triggered':
          // Wait for reset
          break;
      }
      
      // Display state on canvas for debugging
      const ctx = gestureCanvas.getContext('2d');
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#FF69B4'; // Hot pink color
      ctx.fillText(`Palm Wave: ${openPalmWaveState} | Open: ${isPalmOpen} | Move: ${fingerMovementVariance.toFixed(4)} | CD: ${Math.max(0, ((lastOpenPalmWaveTime + openPalmWaveCooldown) - now) / 1000).toFixed(1)}s`, 10, 180);
      ctx.restore();
    }
    
    // Detect index finger point + click gesture for star burst effect
    function detectIndexFingerClickGesture(landmarks, now) {
      // Get key landmarks
      const indexTip = landmarks[8];     // Index finger tip
      const indexMCP = landmarks[5];     // Index finger base (MCP joint)
      const middleTip = landmarks[12];   // Middle finger tip
      const ringTip = landmarks[16];     // Ring finger tip
      const pinkyTip = landmarks[20];    // Pinky finger tip
      const thumbTip = landmarks[4];     // Thumb tip
      const wrist = landmarks[0];        // Wrist
      
      // Check if only index finger is extended (others should be curled)
      const indexExtended = isFingerExtended(landmarks, 8, 5); // Index finger
      const middleExtended = isFingerExtended(landmarks, 12, 9); // Middle finger
      const ringExtended = isFingerExtended(landmarks, 16, 13); // Ring finger
      const pinkyExtended = isFingerExtended(landmarks, 20, 17); // Pinky
      const thumbExtended = isThumbExtended(landmarks);
      
      // Only index finger should be extended (others curled)
      const onlyIndexExtended = indexExtended && !middleExtended && !ringExtended && !pinkyExtended;
      
      // Track index finger position and velocity for click detection
      const currentIndexPos = { x: indexTip.x, y: indexTip.y };
      
      let velocity = 0;
      if (previousIndexFingerPosition) {
        const dx = currentIndexPos.x - previousIndexFingerPosition.x;
        const dy = currentIndexPos.y - previousIndexFingerPosition.y;
        velocity = Math.sqrt(dx * dx + dy * dy);
        
        // Store in history for averaging
        indexFingerVelocityHistory.push(velocity);
        if (indexFingerVelocityHistory.length > 5) {
          indexFingerVelocityHistory.shift(); // Keep last 5 frames
        }
      }
      
      previousIndexFingerPosition = currentIndexPos;
      
      // Calculate average velocity (smooth out noise)
      let avgVelocity = 0;
      if (indexFingerVelocityHistory.length > 0) {
        avgVelocity = indexFingerVelocityHistory.reduce((a, b) => a + b, 0) / indexFingerVelocityHistory.length;
      }
      
      // State machine for index finger + click detection
      switch (indexFingerClickState) {
        case 'none':
          // Start detecting when only index finger is extended
          if (onlyIndexExtended) {
            indexFingerClickState = 'pointing';
            console.log('☝️ Index finger pointing detected! Velocity:', avgVelocity.toFixed(4));
          }
          break;
          
        case 'pointing':
          // Continue while only index is extended
          if (!onlyIndexExtended) {
            indexFingerClickState = 'none';
            console.log('Pointing cancelled - finger configuration changed');
          } else if (avgVelocity > 0.025 && (now - lastIndexFingerClickTime) > indexFingerClickCooldown) {
            // Fast movement detected = CLICK!
            indexFingerClickState = 'clicked';
            console.log('⭐ INDEX FINGER CLICK TRIGGERED! Velocity:', avgVelocity.toFixed(4));
            
            // Create star burst at fingertip position (NO mirroring - video is not mirrored)
            createStarBurst(indexTip.x, indexTip.y);
            lastIndexFingerClickTime = now;
            
            // Reset after short delay
            setTimeout(() => {
              indexFingerClickState = 'none';
            }, 300);
          }
          break;
          
        case 'clicked':
          // Wait for reset
          break;
      }
      
      // Display state on canvas
      const ctx = gestureCanvas.getContext('2d');
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#FFD700'; // Gold color
      ctx.fillText(`👆 Finger Click: ${indexFingerClickState} | Point: ${onlyIndexExtended} | Vel: ${avgVelocity.toFixed(4)} | CD: ${Math.max(0, ((lastIndexFingerClickTime + indexFingerClickCooldown) - now) / 1000).toFixed(1)}s`, 10, 200);
      ctx.restore();
    }
    
    // Helper function to check if a finger is extended
    function isFingerExtended(landmarks, tipIdx, baseIdx) {
      const tip = landmarks[tipIdx];
      const base = landmarks[baseIdx];
      const wrist = landmarks[0];
      
      const tipToWrist = distance(tip, wrist);
      const baseToWrist = distance(base, wrist);
      
      return tipToWrist > baseToWrist * 1.2; // Tip further from wrist than base
    }
    
    // Helper function to check if thumb is extended
    function isThumbExtended(landmarks) {
      const thumbTip = landmarks[4];
      const thumbIP = landmarks[3]; // Interphalangeal joint
      const thumbMCP = landmarks[2]; // Metacarpophalangeal joint
      const wrist = landmarks[0];
      
      const tipToWrist = distance(thumbTip, wrist);
      const mcpToWrist = distance(thumbMCP, wrist);
      
      return tipToWrist > mcpToWrist * 1.15;
    }
    
    // Create star burst effect at specific position
    function createStarBurst(x, y) {
      const now = Date.now();
      
      console.log('⭐ Creating STAR BURST at position:', x.toFixed(3), y.toFixed(3));
      
      // Star colors (golden/warm palette)
      const starColors = [
        '#FFD700', // Gold
        '#FFA500', // Orange
        '#FFFF00', // Yellow
        '#FFE4B5', // Moccasin
        '#FFFACD', // LemonChiffon
        '#FFF8DC', // Cornsilk
        '#FAFAD2', // LightGoldenRodYellow
        '#F0E68C'  // Khaki
      ];
      
      const totalStars = 12; // Number of stars in burst
      
      for (let i = 0; i < totalStars; i++) {
        const angle = (i / totalStars) * Math.PI * 2 + (Math.random() - 0.5) * 0.5; // Slight randomization
        const speed = 0.008 + Math.random() * 0.012; // Outward burst speed
        const size = 8 + Math.random() * 14; // Star size: 8-22 pixels
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        
        starParticles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: size,
          rotation: Math.random() * Math.PI * 2, // Initial random rotation
          rotationSpeed: (Math.random() - 0.5) * 0.15, // Rotation speed
          type: 'star',
          opacity: 0,
          createdAt: now + Math.random() * 50, // Slight stagger (0-50ms)
          lifetime: 3000 + Math.random() * 2000, // Live 3-5 seconds
          color: color,
          points: 5, // 5-pointed stars
          trailLength: 0, // For motion trail effect
          maxTrailLength: 5 // Max trail positions
        });
      }
      
      // Add some sparkle dots around the main stars
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 0.08;
        const speed = 0.002 + Math.random() * 0.004;
        
        starParticles.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 4,
          type: 'sparkle',
          opacity: 0,
          createdAt: now + Math.random() * 100,
          lifetime: 1000 + Math.random() * 600,
          color: '#FFFFFF',
          twinkleSpeed: 0.01 + Math.random() * 0.02
        });
      }
      
      console.log(`✨ Created ${totalStars + 20} star particles (${totalStars} stars + 20 sparkles)`);
    }
    
    // Update and draw star particles
    function updateAndDrawStarParticles(ctx) {
      const now = Date.now();
      let activeCount = 0;
      
      // Get canvas dimensions
      const canvasWidth = gestureCanvas.width || 640;
      const canvasHeight = gestureCanvas.height || 480;
      
      // Update and draw each star particle
      starParticles.forEach((particle) => {
        const age = now - particle.createdAt;
        
        if (age < 0) return; // Not yet visible
        if (age > particle.lifetime) return; // Expired
        
        activeCount++;
        
        const lifeProgress = age / particle.lifetime;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply slight deceleration
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Update rotation for stars
        if (particle.type === 'star') {
          particle.rotation += particle.rotationSpeed;
        }
        
        // Convert to pixel coordinates
        const pixelX = particle.x * canvasWidth;
        const pixelY = particle.y * canvasHeight;
        
        // Fade in quickly, fade out slowly
        let opacity;
        if (lifeProgress < 0.1) {
          opacity = lifeProgress / 0.1;
        } else if (lifeProgress > 0.7) {
          opacity = 1 - ((lifeProgress - 0.7) / 0.3);
        } else {
          opacity = 1;
        }
        
        // Size pulsing for stars
        let currentSize = particle.size;
        if (particle.type === 'star') {
          const pulse = 1 + Math.sin(now * 0.01) * 0.15;
          currentSize = particle.size * pulse * (1 - lifeProgress * 0.3);
        } else if (particle.type === 'sparkle') {
          const twinkle = 0.5 + Math.abs(Math.sin(now * particle.twinkleSpeed)) * 0.5;
          currentSize = particle.size * twinkle;
        }
        
        // Draw the particle
        ctx.save();
        ctx.globalAlpha = opacity;
        
        if (particle.type === 'star') {
          // Draw 5-pointed star
          drawStarShape(ctx, pixelX, pixelY, currentSize, particle.rotation, particle.color);
        } else if (particle.type === 'sparkle') {
          // Draw sparkle dot
          ctx.beginPath();
          ctx.fillStyle = particle.color;
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 10;
          ctx.arc(pixelX, pixelY, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });
      
      // Clean up expired particles periodically
      if (!window.starCleanupCounter) window.starCleanupCounter = 0;
      window.starCleanupCounter++;
      if (window.starCleanupCounter % 180 === 0) { // Every ~3 seconds at 60fps
        starParticles = starParticles.filter(p => (now - p.createdAt) < p.lifetime);
      }
    }
    
    // Draw a 5-pointed star shape
    function drawStarShape(ctx, cx, cy, size, rotation, color) {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size * 0.4;
      
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      
      let rot = -Math.PI / 2; // Start from top
      const step = Math.PI / spikes;
      
      ctx.moveTo(0, -outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        // Outer point
        let x = Math.cos(rot) * outerRadius;
        let y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        // Inner point
        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      
      ctx.closePath();
      
      // Gradient fill
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius);
      gradient.addColorStop(0, '#FFFFFF');       // White center
      gradient.addColorStop(0.3, color);         // Color at 30%
      gradient.addColorStop(1, color + 'AA');    // Semi-transparent edge
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.fill();
      
      ctx.restore();
    }
    
    // Test function: Manually trigger star burst (call from browser console: testStars())
    window.testStars = function() {
      console.log('🧪 Manual test: Creating star burst at center of screen');
      createStarBurst(0.5, 0.5);
    };
    console.log('💡 Tips: testRipples() for ripples | testStars() for stars!');
    
    // Create colorful ripple particles emanating from palm center (SCATTERED - not clustered)
    function createColorfulRippleParticles(landmarks) {
      const now = Date.now();
      
      // Use palm center (middle of hand) as emission point
      const palmCenter = landmarks[9]; // Middle finger MCP joint (center of palm)
      
      // CRITICAL: ALWAYS mirror X coordinate because camera is mirrored!
      // Both left and right hands need mirroring since we see a mirror image
      const finalPalmX = 1.0 - palmCenter.x;
      
      console.log('✨ Creating ripples at mirrored position:', finalPalmX.toFixed(3), '(original:', palmCenter.x.toFixed(3), ')');
      
      // Vibrant color palette for ripples
      const colors = [
        '#FF6B9D', // Hot pink
        '#C44DFF', // Purple
        '#4ECDC4', // Teal
        '#FFE66D', // Yellow
        '#FF8C42', // Orange
        '#95E1D3', // Mint
        '#F38181', // Coral
        '#AA96DA', // Lavender
        '#FCBAD3', // Light pink
        '#A8E6CF'  // Light green
      ];
      
      // Configuration
      const totalParticles = 36; // Total number of particles
      const scatterRadiusMin = 0.08; // Minimum scatter distance from palm
      const scatterRadiusMax = 0.28; // Maximum scatter distance from palm
      
      console.log('🌈 Creating SCATTERED colorful ripples at position:', finalPalmX.toFixed(3), palmCenter.y.toFixed(3));
      
      for (let i = 0; i < totalParticles; i++) {
        // Random angle for scattered distribution
        const angle = Math.random() * Math.PI * 2;
        
        // Random distance within scatter range (particles start ALREADY scattered!)
        const distance = scatterRadiusMin + Math.random() * (scatterRadiusMax - scatterRadiusMin);
        
        // Calculate starting position (SCATTERED around palm, NOT at center)
        const startX = finalPalmX + Math.cos(angle) * distance;
        const startY = palmCenter.y + Math.sin(angle) * distance;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random gentle drift velocity (slow floating movement, not fast expansion)
        const driftSpeed = 0.0005 + Math.random() * 0.001;
        const driftAngle = Math.random() * Math.PI * 2;
        
        rippleParticles.push({
          x: startX, // Start at scattered position (NOT at palm center)
          y: startY,
          vx: Math.cos(driftAngle) * driftSpeed, // Gentle drift velocity
          vy: Math.sin(driftAngle) * driftSpeed,
          size: Math.random() * 8 + 6, // Size between 6-14 pixels (slightly larger)
          type: 'ripple',
          opacity: 0, // Start invisible
          createdAt: now + Math.random() * 200, // Slight random delay (0-200ms) for natural appearance
          lifetime: 5000 + Math.random() * 2000, // Live for 5-7 seconds with variation
          color: color,
          originalX: startX, // Remember original position
          originalY: startY,
          floatPhase: Math.random() * Math.PI * 2, // Random phase for floating animation
          floatAmplitude: 0.01 + Math.random() * 0.02, // Floating amplitude
          floatSpeed: 0.002 + Math.random() * 0.003, // Floating speed
          twinkleSpeed: 0.005 + Math.random() * 0.01, // Twinkle/pulse speed
          particleType: 'circle' // ALL circles now (no stars)
        });
      }
      
      console.log(`Created ${totalParticles} SCATTERED colorful ripple particles`);
    }
    
    // Test function: Manually trigger ripple particles (call from browser console: testRipples())
    window.testRipples = function() {
      console.log('🧪 Manual test: Creating ripples at center of screen');
      const fakeLandmarks = Array(21).fill({x: 0.5, y: 0.5, z: 0}); // Create fake landmarks at center
      createColorfulRippleParticles(fakeLandmarks);
    };
    console.log('💡 Tip: Type testRipples() in browser console to manually trigger colorful ripples!');
    
    // Update and draw colorful ripple particles (SCATTERED version with floating animation)
    function updateAndDrawRippleParticles(ctx) {
      const now = Date.now();
      let activeParticles = 0;
      
      // Debug: Log particle count periodically
      if (!window.rippleDebugCounter) window.rippleDebugCounter = 0;
      window.rippleDebugCounter++;
      if (window.rippleDebugCounter % 60 === 0) { // Every ~1 second at 60fps
        console.log('💫 SCATTERED Ripple particles active:', rippleParticles.length, '| Canvas:', !!ctx);
      }
      
      // Get canvas dimensions for coordinate conversion
      const canvasWidth = gestureCanvas.width || 640; // Fallback to common resolution
      const canvasHeight = gestureCanvas.height || 480;
      
      // Update and draw each scattered ripple particle
      rippleParticles.forEach((particle, index) => {
        const age = now - particle.createdAt;
        
        // Check if particle should be visible yet
        if (age < 0) return;
        
        // Check if particle has expired
        if (age > particle.lifetime) return;
        
        activeParticles++;
        
        // Calculate life progress (0 to 1)
        const lifeProgress = age / particle.lifetime;
        
        // FLOATING ANIMATION: Gentle floating motion around original scattered position
        const floatOffsetX = Math.sin(now * particle.floatSpeed + particle.floatPhase) * particle.floatAmplitude;
        const floatOffsetY = Math.cos(now * particle.floatSpeed * 0.7 + particle.floatPhase) * particle.floatAmplitude * 0.6;
        
        // Apply gentle drift movement
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Calculate current position with floating animation (convert to pixel coordinates)
        const currentX = (particle.x + floatOffsetX) * canvasWidth;
        const currentY = (particle.y + floatOffsetY) * canvasHeight;
        
        // FADE: Quick fade in, slow fade out
        let opacity;
        if (lifeProgress < 0.08) {
          // Fade in during first 8%
          opacity = lifeProgress / 0.08;
        } else if (lifeProgress > 0.75) {
          // Fade out during last 25%
          opacity = 1 - ((lifeProgress - 0.75) / 0.25);
        } else {
          opacity = 1; // Full opacity
        }
        
        // TWINKLE/PULSE: Size pulsing effect
        const twinkle = 1 + Math.sin(now * particle.twinkleSpeed) * 0.25;
        const baseSize = Math.min(canvasWidth, canvasHeight) * 0.018; // Base size relative to canvas
        const currentSize = (particle.size * twinkle + baseSize) * (1 - lifeProgress * 0.25); // Shrink slightly over time
        
        // Draw the particle
        ctx.save();
        ctx.globalAlpha = opacity;
        
        if (particle.particleType === 'star') {
          // Stars removed - this code won't execute anymore
        } else {
          // Draw CIRCLE shape - PURE SOLID COLOR (no white center)
          ctx.beginPath();
          
          // Solid color circle with slight transparency at edges only
          const gradient = ctx.createRadialGradient(
            currentX, currentY, 0,
            currentX, currentY, currentSize
          );
          
          gradient.addColorStop(0, particle.color);           // Solid color center
          gradient.addColorStop(0.85, particle.color);       // Solid color till 85%
          gradient.addColorStop(1, particle.color + '00');   // Transparent edge ONLY
          
          ctx.fillStyle = gradient;
          ctx.arc(currentX, currentY, currentSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Subtle glow effect (no harsh glow)
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        }
        
        ctx.restore();
      });
      
      // Clean up expired particles periodically (every 5 seconds)
      if (!window.rippleCleanupCounter) window.rippleCleanupCounter = 0;
      window.rippleCleanupCounter++;
      
      if (window.rippleCleanupCounter % 300 === 0) { // ~5 seconds at 60fps
        rippleParticles = rippleParticles.filter(p => (now - p.createdAt) < p.lifetime);
        console.log('🧹 Cleaned up expired ripples. Remaining:', rippleParticles.length);
      }
    }
    
    // Helper function to draw star shape
    function drawStar(ctx, cx, cy, size, color) {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size * 0.4;
      let rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;
      
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        let x = cx + Math.cos(rot) * outerRadius;
        let y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      
      // Gradient fill for star
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerRadius);
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.3, color);
      gradient.addColorStop(1, color + 'AA');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 25;
      ctx.fill();
    }
    
    // Detect gestures based on hand landmarks
    function detectHandGestures(landmarks) {
      const now = Date.now();
      
      // Detect wave gesture (yellow clover)
      detectWaveGesture(landmarks, now);
      
      // Detect pinch-to-separate gesture (green clover with growing stem)
      detectPinchGesture(landmarks, now);
      
      // Detect fist-to-open gesture (blue clover)
      detectFistGesture(landmarks, now);
      
      // Detect open palm + finger wave gesture (colorful ripple particles)
      detectOpenPalmWaveGesture(landmarks, now);
      
      // Detect index finger point + click gesture (star burst)
      detectIndexFingerClickGesture(landmarks, now);
    }
    
    // Calculate Eye Aspect Ratio (EAR)
    function calculateEyeAspectRatio(landmarks, eyeIndices) {
      // Vertical distances
      const v1 = distance(landmarks[eyeIndices[1]], landmarks[eyeIndices[5]]);
      const v2 = distance(landmarks[eyeIndices[2]], landmarks[eyeIndices[4]]);
      
      // Horizontal distance
      const h = distance(landmarks[eyeIndices[0]], landmarks[eyeIndices[3]]);
      
      // EAR formula
      return (v1 + v2) / (2.0 * h);
    }
    
    // Calculate Euclidean distance between two points
    function distance(point1, point2) {
      return Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + 
        Math.pow(point2.y - point1.y, 2)
      );
    }
    
    // Calculate finger extension ratio
    function calculateFingerExtensionRatio(landmarks) {
      const fingerTips = [8, 12, 16, 20];
      const fingerBases = [5, 9, 13, 17];
      const palmBase = 0;
      
      let totalExtension = 0;
      let totalLength = 0;
      
      for (let i = 0; i < fingerTips.length; i++) {
        const tip = landmarks[fingerTips[i]];
        const base = landmarks[fingerBases[i]];
        const palm = landmarks[palmBase];
        
        const tipToBase = distance(tip, base);
        const baseToPalm = distance(base, palm);
        
        totalExtension += tipToBase;
        totalLength += baseToPalm;
      }
      
      return totalExtension / totalLength;
    }
    
    // Show animated clover effect with SVG and cooldown protection
    function showCloverEffect(color) {
      if (!cloverEffectsContainer) return;
      
      // Cooldown check to prevent multiple same-color clovers
      const now = Date.now();
      const lastCloverTime = window.lastCloverTime || {};
      const CLOVER_COOLDOWN = 2000; // 2 seconds cooldown per color
      
      if (lastCloverTime[color] && (now - lastCloverTime[color]) < CLOVER_COOLDOWN) {
        console.log(`${color} clover on cooldown, skipping`);
        return;
      }
      
      // Update last trigger time for this color
      window.lastCloverTime = lastCloverTime;
      lastCloverTime[color] = now;
      
      // Create clover element with SVG
      const clover = document.createElement('div');
      clover.className = `animated-clover ${color}`;
      
      // Generate SVG clover based on color
      const svgClover = createCloverSVG(color);
      clover.innerHTML = svgClover;
      
      // Random position within the container (20% to 80%)
      const randomX = Math.random() * 60 + 20;
      const randomY = Math.random() * 60 + 20;
      
      // Add slight random offset for natural feel
      const offsetX = (Math.random() - 0.5) * 5; // ±2.5%
      const offsetY = (Math.random() - 0.5) * 5;
      
      clover.style.left = `${randomX + offsetX}%`;
      clover.style.top = `${randomY + offsetY}%`;
      
      // Random rotation for variety
      const randomRotation = Math.random() * 30 - 15; // -15 to 15 degrees
      clover.style.setProperty('--rotation', `${randomRotation}deg`);
      clover.style.transform = `rotate(${randomRotation}deg)`;
      
      cloverEffectsContainer.appendChild(clover);
      
      console.log(`${color} clover shown at ${randomX.toFixed(1)}%, ${randomY.toFixed(1)}% with rotation ${randomRotation.toFixed(1)}°`);
      
      // Clovers now stay visible with floating animation - no removal
    }
    
    // Show growing clover effect with stem that grows to 75% of camera height
    function showGrowingCloverEffect(color, pinchPosition) {
      if (!cloverEffectsContainer) return;
      
      // Cooldown check to prevent multiple same-color clovers
      const now = Date.now();
      const lastCloverTime = window.lastCloverTime || {};
      const CLOVER_COOLDOWN = 2000; // 2 seconds cooldown per color
      
      if (lastCloverTime[color] && (now - lastCloverTime[color]) < CLOVER_COOLDOWN) {
        console.log(`${color} growing clover on cooldown, skipping`);
        return;
      }
      
      // Update last trigger time for this color
      window.lastCloverTime = lastCloverTime;
      lastCloverTime[color] = now;
      
      // Create clover element with SVG
      const clover = document.createElement('div');
      clover.className = `growing-clover ${color}`;
      
      // Generate SVG clover with stem based on color
      const svgClover = createGrowingCloverSVG(color);
      clover.innerHTML = svgClover;
      
      // Position calculation based on color and available position data
      let posX = 50; // default center
      let posY = 95; // default near bottom
      
      if (color === 'green' && pinchPosition) {
        // For green clovers, use pinch X position but ALWAYS grow from bottom
        posX = pinchPosition.x * 100; // Use pinch horizontal position
        posY = 95; // Force to bottom for green clovers - stem always grows from bottom
        
        console.log(`Green clover at pinch X: ${posX.toFixed(1)}%, growing from bottom`);
      } else if (window.lastHandPosition) {
        // For other colors or if no pinch position, use hand position
        posX = window.lastHandPosition.x * 100;
        
        if (color === 'green') {
          posY = 95; // Force to bottom for green if no pinch position
        } else {
          posY = window.lastHandPosition.y * 100;
          posY = Math.max(75, posY);
        }
      } else {
        // Random position if no hand detected
        posX = Math.random() * 70 + 15;
      }
      
      // Clamp values to keep clover within view
      posX = Math.max(10, Math.min(90, posX));
      
      if (color === 'green') {
        // Green clovers ALWAYS at bottom (90-98%)
        posY = Math.max(90, Math.min(98, posY));
      } else {
        // Other colors stay in bottom area
        posY = Math.max(85, Math.min(98, posY));
      }
      
      clover.style.left = `${posX}%`;
      clover.style.bottom = `${100 - posY}%`;
      clover.style.transform = 'translateX(-50%)';
      
      cloverEffectsContainer.appendChild(clover);
      
      console.log(`${color} growing clover created at (${posX.toFixed(1)}%, ${posY.toFixed(1)}%)`);
      
      // Growing clovers now stay visible with floating animation - no removal
    }
    
    // Create SVG clover based on color with fresh forest style - matching photoboothshape.png aesthetic
    function createCloverSVG(color) {
      let fillColor = '#3fc43b'; // default green (H125 S84 V77)
      
      if (color === 'blue') {
        fillColor = '#a8d8ea'; // light water blue
      } else if (color === 'yellow') {
        fillColor = '#f9e79f'; // goose yellow / soft cream yellow
      } else if (color === 'green') {
        fillColor = '#82c9a1'; // fresh forest green
      }
      
      // Perfectly symmetrical clover leaves with heart-like indentation at top
      // All three leaves are identical, rotated 120° apart
      // Each leaf converges at center point (50, 50)
      
      // Base leaf shape: pointing DOWN to center, with heart-shaped top indentation
      const baseLeaf = `M50,50 C48,48 42,38 38,28 C34,18 32,10 36,8 C40,6 46,8 50,14 C54,8 60,6 64,8 C68,10 66,18 62,28 C58,38 52,48 50,50 Z`;
      
      return `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-${color}" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          
          <!-- Top leaf (0° rotation) -->
          <g transform="rotate(0, 50, 50)">
            <path d="${baseLeaf}" 
                  fill="${fillColor}" stroke="none" filter="url(#glow-${color})" opacity="0.95"/>
          </g>
          
          <!-- Bottom-left leaf (120° rotation) -->
          <g transform="rotate(120, 50, 50)">
            <path d="${baseLeaf}" 
                  fill="${fillColor}" stroke="none" filter="url(#glow-${color})" opacity="0.95"/>
          </g>
          
          <!-- Bottom-right leaf (240° rotation) -->
          <g transform="rotate(240, 50, 50)">
            <path d="${baseLeaf}" 
                  fill="${fillColor}" stroke="none" filter="url(#glow-${color})" opacity="0.95"/>
          </g>
          
          <!-- Center point where all leaves meet -->
          <circle cx="50" cy="50" r="2.5" fill="${fillColor}" opacity="0.8"/>
        </svg>
      `;
    }
    
    // Create SVG clover with natural curved stem that grows
    function createGrowingCloverSVG(color) {
      let fillColor = '#82c9a1'; // fresh forest green for green clover
      let stemColor = '#5a9e6f'; // darker green for stem
      
      if (color === 'blue') {
        fillColor = '#a8d8ea';
        stemColor = '#7ab8d4';
      } else if (color === 'yellow') {
        fillColor = '#f9e79f';
        stemColor = '#d4c47a';
      }
      
      // Clover leaves - same shape as regular clover, positioned at top of stem
      // Using the same base leaf shape from createCloverSVG but scaled appropriately
      const baseLeaf = `M50,50 C48,48 42,38 38,28 C34,18 32,10 36,8 C40,6 46,8 50,14 C54,8 60,6 64,8 C68,10 66,18 62,28 C58,38 52,48 50,50 Z`;
      
      return `
        <svg viewBox="0 0 100 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
          <defs>
            <filter id="stem-glow-${color}" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            
            <!-- Gradient for natural stem appearance -->
            <linearGradient id="stem-gradient-${color}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${stemColor};stop-opacity:1" />
              <stop offset="50%" style="stop-color:${fillColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${stemColor};stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <!-- ENTIRE PLANT GROUP - stem and leaves sway together as one unit to maintain connection -->
          <g class="entire-plant-group">
            <!-- Clover leaves cluster positioned at top - appears AFTER stem reaches full height -->
            <g class="clover-leaves-cluster">
              <!-- Top leaf (0° rotation) -->
              <g transform="rotate(0, 50, 50)">
                <path d="${baseLeaf}" 
                      fill="${fillColor}" 
                      stroke="none"
                      filter="url(#stem-glow-${color})"
                      opacity="0.95"/>
              </g>
              
              <!-- Bottom-left leaf (120° rotation) -->
              <g transform="rotate(120, 50, 50)">
                <path d="${baseLeaf}" 
                      fill="${fillColor}" 
                      stroke="none"
                      filter="url(#stem-glow-${color})"
                      opacity="0.95"/>
              </g>
              
              <!-- Bottom-right leaf (240° rotation) -->
              <g transform="rotate(240, 50, 50)">
                <path d="${baseLeaf}" 
                      fill="${fillColor}" 
                      stroke="none"
                      filter="url(#stem-glow-${color})"
                      opacity="0.95"/>
              </g>
              
              <!-- Center point where all leaves meet and stem connects - perfect alignment -->
              <circle cx="50" cy="50" r="2.5" fill="${stemColor}" opacity="0.8"/>
            </g>
            
            <!-- Growing stem - starts from exact bottom with large natural arc, rendered AFTER leaves so it appears on top -->
            <g class="growing-stem">
              <!-- Large curved stem path with significant wind-sway arc - SHORTER by 1/4, starts at bottom (50,400) with big curve and ends exactly at leaf center focal point (50,50) -->
              <path d="M50,400 C65,365 35,335 45,305 C55,275 40,245 48,215 C56,185 44,155 49,125 C52,105 51,85 50,65 C50,58 50,54 50,50" 
                    fill="none" 
                    stroke="url(#stem-gradient-${color})" 
                    stroke-width="4" 
                    stroke-linecap="round"
                    filter="url(#stem-glow-${color})"
                    class="stem-path"/>
            </g>
          </g>
        </svg>
      `;
    }
  });

  // === Interactive Background Firefly Clover Effect ===
  const mainContent = document.querySelector('.main-content');
  console.log('=== Initializing firefly clover effect ===');
  console.log('mainContent element:', mainContent);
  
  if (!mainContent) {
    console.error('ERROR: mainContent not found! Firefly effect will not work.');
  } else {
    console.log('mainContent found, setting up mouse move listeners...');
  }
  
  let lastSpawnTime = 0;
  let cloverSpawnCount = 0;
  const SPAWN_INTERVAL = 150; // Minimum time between spawns (ms)

  // Create an interactive glowing clover at position - firefly style
  function createFireflyClover(x, y) {
    const now = Date.now();
    if (now - lastSpawnTime < SPAWN_INTERVAL) {
      return; // Don't spawn too frequently
    }
    lastSpawnTime = now;
    
    console.log('Creating new teardrop clover shape');
    
    const clover = document.createElement('div');
    clover.className = 'interactive-clover';
    
    // Random color for variety - soft glowing colors
    const colors = [
      '#a8e6cf', // soft mint green
      '#ffd3b6', // warm peach
      '#ffaaa5', // soft coral
      '#dcedc1', // pale lime
      '#ffd93d', // soft yellow
      '#6bcf7f'  // light green
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random size - smaller and more varied (15-30px)
    const size = 15 + Math.random() * 15;
    
    // Random rotation
    const rotation = Math.random() * 360;
    
    // Create SVG clover with three distinct teardrop leaves at 120-degree angles
    clover.innerHTML = `
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="firefly-glow-${cloverSpawnCount}">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <!-- Top leaf - teardrop pointing UP (0 degrees) -->
        <path d="M20,20 C18,18 15,12 14,8 C13,4 15,1 18,1 C20,1 20,4 20,8 C20,4 20,1 22,1 C25,1 27,4 26,8 C25,12 22,18 20,20 Z" 
              fill="${color}" 
              filter="url(#firefly-glow-${cloverSpawnCount})"
              opacity="0.8"/>
        <!-- Bottom-left leaf - teardrop pointing DOWN-LEFT (120 degrees) -->
        <path d="M20,20 C22,19 26,17 29,16 C32,15 35,16 36,19 C37,21 34,22 31,22 C34,23 37,24 36,27 C35,29 32,30 29,29 C26,28 22,24 20,20 Z" 
              fill="${color}" 
              filter="url(#firefly-glow-${cloverSpawnCount})"
              opacity="0.8"/>
        <!-- Bottom-right leaf - teardrop pointing DOWN-RIGHT (240 degrees) -->
        <path d="M20,20 C18,24 14,28 11,29 C8,30 5,29 4,27 C3,24 6,23 9,22 C6,22 3,21 4,19 C5,16 8,15 11,16 C14,17 18,19 20,20 Z" 
              fill="${color}" 
              filter="url(#firefly-glow-${cloverSpawnCount})"
              opacity="0.8"/>
      </svg>
    `;
    
    // Position the clover with some randomness for scattered effect
    const offsetX = (Math.random() - 0.5) * 40; // ±20px scatter
    const offsetY = (Math.random() - 0.5) * 40;
    clover.style.left = (x - size/2 + offsetX) + 'px';
    clover.style.top = (y - size/2 + offsetY) + 'px';
    clover.style.width = size + 'px';
    clover.style.height = size + 'px';
    clover.style.setProperty('--rotation', rotation + 'deg');
    
    mainContent.appendChild(clover);
    cloverSpawnCount++;
    
    // Remove after animation completes (3 seconds)
    setTimeout(() => {
      if (clover.parentNode) {
        clover.parentNode.removeChild(clover);
      }
    }, 3000);
  }

  // Mouse move - create firefly clovers automatically (no click needed)
  mainContent.addEventListener('mousemove', (e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;
    
    // Check if mouse is over the main clover container
    const cloverContainer = document.querySelector('.clover-container');
    if (cloverContainer) {
      const rect = cloverContainer.getBoundingClientRect();
      // Add some padding around the clover to avoid edge cases
      const padding = 20;
      if (currentX >= rect.left - padding && 
          currentX <= rect.right + padding && 
          currentY >= rect.top - padding && 
          currentY <= rect.bottom + padding) {
        // Mouse is over or near the main clover, don't spawn fireflies
        return;
      }
    }
    
    // Get position relative to mainContent
    const rect = mainContent.getBoundingClientRect();
    const x = currentX - rect.left;
    const y = currentY - rect.top;
    
    // Create a firefly clover at this position
    createFireflyClover(x, y);
  });

  // Touch support for mobile devices
  mainContent.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    const rect = mainContent.getBoundingClientRect();
    const x = currentX - rect.left;
    const y = currentY - rect.top;
    
    createFireflyClover(x, y);
  });

})();