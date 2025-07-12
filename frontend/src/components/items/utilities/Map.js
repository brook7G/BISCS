import { ReactBingmaps } from 'react-bingmaps';

const Map = ({ defaultLocation, width, height, pushPin }) => {
  return (
    <div
      style={{
        width: width || '100%',
        height: height || '40vh',
        border: '1px solid black',
      }}
    >
      <ReactBingmaps
        bingmapKey="AuJ-09hG9klQpIlE48fGFMRXOjVi_LV19JxbOdKFcXzCefZJvue0DWOYvvpuYQSh"
        center={defaultLocation}
        zoom={17}
        mapTypeId={'aerial'}
        pushPins={
          pushPin || [
            {
              location: defaultLocation,
              option: { color: 'red' },
            },
          ]
        }
      ></ReactBingmaps>
    </div>
  );
};

export default Map;
