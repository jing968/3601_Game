import data from "../Assets/data.txt";

const useVolume = async () => {
  const powerArr = [];

  const filterData = (entries) => {
    const entrySizePerSecond = 256000;
    var arr = [];
    // Loop through all entries
    for (var i = 0; i < entries.length; i++) {
      // Write entry into temp arr
      arr.push(entries[i]);
      // If accumlated all entries for a given second
      // Or
      // Reach the last entry in the wav file
      if (arr.length === entrySizePerSecond || i === entries.length - 1) {
        // Cal max volume for the given second
        const max = Math.max(...arr);
        // Store max volume
        powerArr.push(max);
        // Wipe arr for a new second
        arr = [];
      }
    }
  };

  fetch(data)
    .then((r) => r.text())
    .then((text) => {
      console.log(text);
    });
  // const res = await fetch(data);
  // console.log(res.text);
  // filterData(res.text());
  // console.log(powerArr);
};

export default useVolume;
