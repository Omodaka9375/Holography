var ARButton = {

	createButton: function ( renderer ) {
		var gl = null
		function initGL() {
			if (gl)
			  return;
	
			gl = createWebGLContext({
			  xrCompatible: true
			});
			document.body.appendChild(gl.canvas);

		  }

		function showStartAR( /*device*/ ) {

			var currentSession = null;

			function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				/*
				session.updateWorldTrackingState( {
					'planeDetectionState': { 'enabled': true }
				} );
				*/

				initGL();

				session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });

				renderer.xr.setReferenceSpaceType( 'local' );
				//renderer.xr.setSession( session );
				button.textContent = 'STOP AR';

				currentSession = session;

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = 'START AR';

				currentSession = null;

			}

			//

			button.style.display = '';

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';

			button.textContent = 'START AR';

			button.onmouseenter = function () {

				button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				button.style.opacity = '0.5';

			};

			button.onclick = function () {

				if ( currentSession === null ) {

					// navigator.xr.requestSession( 'immersive-ar' ).then( onSessionStarted );
					navigator.xr.requestSession('inline') .then(onSessionStarted);
				} else {

					currentSession.end();

				}

			};

		}
		function onRequestSession() {
			// Requests an 'immersive-ar' session, which ensures that the users
			// environment will be visible either via video passthrough or a
			// transparent display. This may be presented either in a headset or
			// fullscreen on a mobile device.
			return navigator.xr.requestSession('immersive-ar')
				.then((session) => {
				  session.isImmersive = true;
				  onSessionStarted(session);
				});
		  }
		function disableButton() {

			button.style.display = '';

			button.style.cursor = 'auto';
			button.style.left = 'calc(50% - 75px)';
			button.style.width = '150px';

			button.onmouseenter = null;
			button.onmouseleave = null;

			button.onclick = null;

		}

		function showARNotSupported() {

			disableButton();

			button.textContent = 'AR NOT SUPPORTED';

		}

		function stylizeElement( element ) {

			element.style.position = 'absolute';
			element.style.bottom = '20px';
			element.style.padding = '12px 6px';
			element.style.border = '1px solid #fff';
			element.style.borderRadius = '4px';
			element.style.background = 'rgba(0,0,0,0.1)';
			element.style.color = '#fff';
			element.style.font = 'normal 13px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.5';
			element.style.outline = 'none';
			element.style.zIndex = '999';

		}

		if ( 'xr' in navigator ) {

			var button = document.createElement( 'button' );
			button.style.display = 'none';

			stylizeElement( button );

			navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

				supported ? showStartAR() : showARNotSupported();

			} ).catch( showARNotSupported );

			return button;

		} else {

			var message = document.createElement( 'a' );
			message.href = 'https://immersiveweb.dev/';

			if ( window.isSecureContext === false ) {

				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement( message );

			return message;

		}

	}

};

export { ARButton };