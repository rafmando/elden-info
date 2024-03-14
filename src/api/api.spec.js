import {
  fetchAmmosApi,
  fetchArmorsApi,
  fetchAshesOfWarApi,
  fetchBossesApi,
  fetchClassesApi,
  fetchCreaturesApi,
  fetchIncantationsApi,
  fetchItemsApi,
  fetchLocationsApi,
} from "./api";

describe("fetchAmmosAPI", () => {
  it("should call the endpoint & successfully retrieve ammos", async () => {
    expect.assertions(1);
    return fetchAmmosApi("Firebone").then((res) => {
      expect(res.length).toEqual(3);
    });
  }, 3000);
});

describe("fetchArmorsAPI", () => {
  it("should call the endpoint & successfully retrieve armors", async () => {
    expect.assertions(1);
    return fetchArmorsApi("Blade").then((res) => {
      expect(res.length).toEqual(5);
    });
  }, 3000);
});

describe("fetchBossesAPI", () => {
  it("should call the endpoint & successfully retrieve bosses", async () => {
    expect.assertions(1);
    return fetchBossesApi("Dragon").then((res) => {
      expect(res.length).toEqual(9);
    });
  }, 3000);
});

describe("fetchClassesAPI", () => {
  it("should call the endpoint & successfully retrieve classes", async () => {
    expect.assertions(1);
    return fetchClassesApi("Knight").then((res) => {
      expect(res.length).toEqual(1);
    });
  }, 3000);
});

describe("fetchCreaturesAPI", () => {
  it("should call the endpoint & successfully retrieve creatures", async () => {
    expect.assertions(1);
    return fetchCreaturesApi("L").then((res) => {
      expect(res.length).toEqual(20);
    });
  }, 3000);
});

describe("fetchIncantationsAPI", () => {
  it("should call the endpoint & successfully retrieve incanations", async () => {
    expect.assertions(1);
    return fetchIncantationsApi("Elden Stars").then((res) => {
      expect(res.length).toEqual(1);
    });
  }, 3000);
});
