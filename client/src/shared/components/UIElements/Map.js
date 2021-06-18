import React from "react";
import "./Map.css";

const Map = (props) => {
  // const mapRef = useRef();
  // const { center, zoom } = props;

  // useEffect(() => {
  //   const map = new window.google.maps.Map(mapRef.current, {
  //     center,
  //     zoom,
  //   });

  //   new Window.google.map.Marker({ position: center, map });
  // }, [center, zoom]);

  // /**********************
  //  * THis will be not working because mapRef is not defined so use the useEffect hook
  //  */

  // //   const map = new window.google.maps.Map(mapRef.current, {
  // //     center:props.center,
  // //     zoom:props.zoom,
  // //   });

  // //   new Window.google.map.Marker({ position: props.center, map });

  // return (
  //   <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
  //     Map
  //   </div>
  // );

  return (
    <div>
      <h1>This is Map</h1>
    </div>
  );
};

export default Map;
