import { Identity } from "@models";


export interface IndentityDetailProps {
  data: Identity;
  lat: number;
  lng: number;
}

export function IndentityDetail(props: IndentityDetailProps) {
  const { data } = props;

  function renderString(data: string | string[]) {
    if (Array.isArray(data)) {
      return data.join(", ");
    }
    return data;
  }

  console.log(data);

  return (
    <div className="translate-x-3">
      <div className="flex bg-[#0f172a] absolute text-[#f8fafc] left-0 w-[500px] p-5 overflow-auto">
        <div className="w-24 h-24 overflow-hidden">
          <img
            className="object-contain w-full h-full"
            src={data.image}
            loading="lazy"
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <p className="text-xl font-semibold">{data.name}</p>
            <a
              href={data.wiki}
              target="_blank"
              className="ml-auto text-sm hover:opacity-80 underline transition-opacity"
            >
              Wiki
            </a>
          </div>
          <div className="mt-2 text-base">
            <p>
              <b>Born</b>: {data.born}
            </p>

            <p className="mt-2">
              <b>Homeworld</b>: {data.homeworld || "Unknown"}
            </p>
            <p className="mt-2">
              <b>Species</b>: {data.species}
            </p>
            <p className="mt-2">
              <b>Affiliations</b>: {data.affiliations.join(", ")}.
            </p>
            {data.masters && (
              <p className="mt-2">
                <b>Masters</b>: {renderString(data.masters)}.
              </p>
            )}

            {data.apprentices && (
              <p className="mt-2">
                <b>Apprentices</b>: {renderString(data.apprentices)}.
              </p>
            )}

            {data.formerAffiliations && data.formerAffiliations.length > 0 && (
              <p className="mt-2">
                <b>Former Affiliations</b>:{" "}
                {renderString(data.formerAffiliations)}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
