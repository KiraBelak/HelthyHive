import MainLayout from "@/components/layouts/MainLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import dateNowUnix from "@/utils/dates/dateNowUnix";
import moment from "moment-timezone";

export default function Home() {
  const [areas, setAreas] = useState(null);
  const [timeStampNow, setTimeStampNow] = useState(dateNowUnix());

  const getAreas = async () => {
    try {
      const { data: areas } = await axios.get("/api/areas");
      setAreas(areas);
    } catch (error) {
      console.log("error getting areas:", error);
    }
  };

  useEffect(() => {
    getAreas();
  }, []);

  //TODO: move this function to a lib file or something
  const isAreaAvailable = (areaId) => {
    const selectedArea = areas.find((area) => area._id === areaId);

    const availableLines = [];

    const { lines } = selectedArea;
    //iterate over lines
    lines.forEach((line) => {
      if (line.active === false) return;

      //iterate over hours
      line.hours.forEach((hour) => {
        const { day, open, close, timeZone } = hour;

        //convert unixtimestamp to date UTC and then to line timezone
        const nowUTC = new Date(timeStampNow * 1000).toUTCString();
        const nowTimeZone = moment.utc(nowUTC).tz(timeZone);

        //gets current day of the week, using the timezone
        const nowDay = nowTimeZone.format("dddd").toLowerCase();

        //Checks if the current day is the same as the day of the hour
        if (day.toLowerCase() == nowDay.toLowerCase()) {
          //start of the day in the hours timezone
          let timeZoneBaseStart = moment(nowTimeZone).startOf("day").format();

          //parses open hour using hour timezone
          const openTimeZone = moment(timeZoneBaseStart)
            .startOf("day")
            .add(open, "hours")
            .format();

          //parses closing hour using hour timezone
          const closeTimeZone = moment(timeZoneBaseStart)
            .startOf("day")
            .add(close, "hours")
            .format();

          //checks if the current time is between the open and close hours
          //then return the line
          if (
            nowTimeZone.isAfter(openTimeZone) &&
            nowTimeZone.isBefore(closeTimeZone)
          )
            availableLines.push({
              ...line,
              status: "open",
            });
        }
      });
    });

    if (!availableLines.length > 0) {
      alert(`No lines available for ${selectedArea.name}`);
    } else {
      console.log("availableLines:", availableLines);
      alert(
        `${availableLines.length} lines available for ${selectedArea.name}, check console...`
      );
    }
  };

  return (
    <MainLayout title="DemoPage" description="this is a demo page">
      <div className="content flex justify-center items-center w-full my-16">
        <div className="wrapper max-w-7xl">
          <h1 className="text-2xl text-center font-bold">
            Get Areas Demo Page {timeStampNow}
          </h1>
          <div className="areawrapper">
            {areas && areas.length > 0 ? (
              <div className="show">
                {areas.map((area) => (
                  <div key={area._id} className="area">
                    <h2 className="text-xl  capitalize">{area.name}</h2>
                    {area.lines && area.lines.length > 0 ? (
                      <div className="lineascontain my-2">
                        {area.lines.map((line) => (
                          <div key={line._id} className="linea ">
                            <p className="italic text-sm">{line.name}</p>

                            {line.hours && line.hours.length > 0 && (
                              <div className="hours">
                                {line.hours.map((hour, index) => (
                                  <div className="hourscontainer" key={index}>
                                    <p>
                                      {hour.day} {hour.open} {hour.close}{" "}
                                      {hour.timeZone}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>no lines</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>no areas</p>
            )}
          </div>

          <div className="sectionofbuttons space-x-4">
            {areas &&
              areas.length > 0 &&
              areas.map((area) => (
                <button
                  key={area._id}
                  className="areabutton bg-green-800 px-2 py-1 text-white rounded-md capitalize"
                  onClick={() => isAreaAvailable(area._id)}
                >
                  {area.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
