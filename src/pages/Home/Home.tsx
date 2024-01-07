import { point } from "@turf/helpers";
import distance from "@turf/distance";
import GoogleMap from "google-maps-react-markers";
import { config } from "../../configs";
import { useGetSecret} from "@hooks";
import { Identity, SecretLocation, SecretLocationWithDistance } from "@models";
import { IdentityRow, IndentityDetail } from "@components";

const defaultProps = {
  center: {
    lat: 60.22411316855324,
    lng: 24.881603493072994,
  },
  zoom: 4,
};

const Marker = (props: { lat: number; lng: number }) => {
  return (
    <div
      className="h-[24px] w-[24px] text-[#76152B] translate-x-[-12px] translate-y-[-12px]"
      data-lat={props.lat}
      data-lng={props.lng}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </div>
  );
};

const PointSecret = (props: {
  lat: number;
  lng: number;
  data: SecretLocation;
}) => {
  const { data } = props;
  return (
    <div className="relative">
      <div className="h-[24px] w-[24px] text-[#FFF05A] translate-x-[-12px] translate-y-[-12px]">
        <button aria-label={`Secret location ID ${data.id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export function HomePage() {
  const locationSecret = useGetSecret();

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const mapsRef = React.useRef<typeof google.maps | null>(null);

  const [marker, setMarker] = React.useState<
    | {
        lat: number;
        lng: number;
      }
    | undefined
  >();

  const [list, setList] = React.useState<
    SecretLocationWithDistance[] | undefined
  >();

  const [detail, setDetail] = React.useState<
    | {
        id: number;
        indentity: Identity;
        lat: number;
        lng: number;
      }
    | undefined
  >();

  const onGoogleApiLoaded = ({
    map,
    maps,
  }: {
    map: google.maps.Map;
    maps: typeof google.maps;
  }) => {
    mapRef.current = map;
    mapsRef.current = maps;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.addListener("click", (mapsMouseEvent: any) => {
      if (mapsMouseEvent.domEvent.explicitOriginalTarget?.closest("#point")) {
        return;
      }
      const lat = mapsMouseEvent.latLng.lat();
      const lng = mapsMouseEvent.latLng.lng();
      setMarker({ lat, lng });
    });
  };

  const onView = (data: {
    id: number;
    indentity: Identity;
    lat: number;
    lng: number;
  }) => {
    if (mapRef.current) {
      mapRef.current.panTo({
        lat: data.lat,
        lng: data.lng,
      });
      setDetail(data);
    }
  };

  React.useEffect(() => {
    if (locationSecret.data && marker) {
      const result = locationSecret.data
        .map((secret) => {
          const distanceSecret = distance(
            point([marker.lng, marker.lat]),
            point([secret.long, secret.lat])
          );
          return {
            ...secret,
            distance: distanceSecret,
          };
        })
        .sort((a, b) => a.distance - b.distance);
      setList(result);
    }
  }, [locationSecret.data, marker]);

  return (
    <div className="pb-24">
      <section className="h-[80vh] relative">
        <GoogleMap
          defaultCenter={{
            lat: defaultProps.center.lat,
            lng: defaultProps.center.lng,
          }}
          defaultZoom={defaultProps.zoom}
          apiKey={config.GOOGLE_MAP_API_KEY}
          onGoogleApiLoaded={onGoogleApiLoaded}
          options={{
            backgroundColor: "#0f172a",
            mapTypeControl: false,
            streetViewControl: false,
            zoomControlOptions: {},
            zoomControl: false,
            styles: [
              {
                elementType: "geometry",
                stylers: [
                  {
                    color: "#212121",
                  },
                ],
              },
              {
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#757575",
                  },
                ],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#212121",
                  },
                ],
              },
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#757575",
                  },
                ],
              },
              {
                featureType: "administrative.country",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#9e9e9e",
                  },
                ],
              },
              {
                featureType: "administrative.land_parcel",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#bdbdbd",
                  },
                ],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#757575",
                  },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#181818",
                  },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#616161",
                  },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#1b1b1b",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#2c2c2c",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#8a8a8a",
                  },
                ],
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#373737",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#3c3c3c",
                  },
                ],
              },
              {
                featureType: "road.highway.controlled_access",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#4e4e4e",
                  },
                ],
              },
              {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#616161",
                  },
                ],
              },
              {
                featureType: "transit",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#757575",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#3d3d3d",
                  },
                ],
              },
            ],
          }}
        >
          {locationSecret.data?.map((secret) => (
            <PointSecret
              key={secret.id}
              lat={secret.lat}
              lng={secret.long}
              data={secret}
            />
          ))}
          {marker && <Marker lat={marker.lat} lng={marker.lng} />}
          {detail && (
            <IndentityDetail
              data={detail.indentity}
              lat={detail.lat}
              lng={detail.lng}
            />
          )}
        </GoogleMap>
      </section>
      {list && (
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-4xl mx-auto h-[500px] px-5 overflow-auto">
          {list.map((secret) => (
            <IdentityRow
              id={secret.id}
              key={secret.id}
              lat={secret.lat}
              lng={secret.long}
              distance={secret.distance}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
}
