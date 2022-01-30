import React, { useEffect, useState } from 'react';
import Unity, { UnityContext } from "react-unity-webgl"

const unityContext = new UnityContext({
  loaderUrl:    "static/games/CubieBird/Build/CubieBird.loader.js",
  dataUrl:      "static/games/CubieBird/Build/CubieBird.data",
  frameworkUrl: "static/games/CubieBird/Build/CubieBird.framework.js",
  codeUrl:      "static/games/CubieBird/Build/CubieBird.wasm",
  // Additional configuration options.
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
});

export default function CubiesPage() {
  return (
    <>
      <div id="cu">
        <div className="lst">
          <Unity className="unity-canvas" unityContext={unityContext} />
          <div className="title">
            <h2 className="h">
              <strong>Ranking</strong> Comming soon...
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
