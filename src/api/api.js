export const fetchAmmosApi = async (query) => {
  try {
    const ammos = await fetch(
      `https://eldenring.fanapis.com/api/ammos?name=${query}`
    );
    const ammosData = await ammos.json();
    return ammosData.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchArmorsApi = async (query) => {
  try {
    const armors = await fetch(
      `https://eldenring.fanapis.com/api/armors?name=${query}`
    );
    const armorsData = await armors.json();
    return armorsData.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchAshesOfWarApi = async (query) => {
  try {
    const ashesOfWar = await fetch(
      `https://eldenring.fanapis.com/api/ashes?name=${query}`
    );
    const ashesOfWarData = await ashesOfWar.json();
    return ashesOfWarData.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchBossesApi = async (query) => {
  try {
    const bosses = await fetch(
      `https://eldenring.fanapis.com/api/bosses?name=${query}`
    );
    const bossesData = await bosses.json();
    return bossesData.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchClassesApi = async (query) => {
  try {
    const classes = await fetch(
      `https://eldenring.fanapis.com/api/classes?name=${query}`
    );
    const classesData = await classes.json();
    return classesData.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchCreaturesApi = async (query) => {
  try {
    const creatures = await fetch(
      `https://eldenring.fanapis.com/api/creatures?name=${query}`
    );
    const creaturesData = await creatures.json();
    return creaturesData.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchIncantationsApi = async (query) => {
  try {
    const incantations = await fetch(
      `https://eldenring.fanapis.com/api/incantations?name=${query}`
    );
    const incantationsData = await incantations.json();
    return incantationsData.data;
  } catch (error) {
    throw new Error(error);
  }
};
