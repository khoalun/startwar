import { useGetIdentity } from "@hooks";
import { Identity } from "@models";

export interface IdentityProps {
  id: number;
  lat: number;
  lng: number;
  distance: number;
  onView: (data: {
    id: number;
    indentity: Identity;
    lat: number;
    lng: number;
  }) => void;
}

export function IdentityRow(props: IdentityProps) {
  const { id, distance, onView } = props;

  const indentity = useGetIdentity({
    id,
    enabled: true,
  });

  return (
    <div
      id={`identity-${id}`}
      className="border border-blue-300 shadow rounded-md p-4 text-[#f8fafc]"
    >
      {indentity.data && (
        <div className="flex">
          <div className="w-16 h-16 overflow-hidden">
            <img
              className="object-contain w-full h-full"
              src={indentity.data.image}
              loading="lazy"
            />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold">{indentity.data.name}</h3>

            <div className="flex items-center text-[#38bdf8] text-sm">
              <p className=""> {distance.toFixed(2)} km</p>
              <button
                className="ml-auto text-white font-bold hover:opacity-80 hover:underline transition-opacity"
                onClick={() => {
                  onView({
                    id,
                    indentity: indentity.data,
                    lat: props.lat,
                    lng: props.lng,
                  });
                }}
              >
                View
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
