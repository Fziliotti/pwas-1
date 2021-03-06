import { shallowMount, createLocalVue } from "@vue/test-utils";
import Bubble from "@/components/BubbleChart.vue";
import Vuex from "vuex";
import { mockData } from "./mockData.js";
import { getters, mutations, actions } from "@/store.js";
import linqjs from "linqjs";
import axios from "axios"; //imports mock axios from __mock__
// import VueSocketio from "vue-socket.io"; //imports from __mock__

jest.mock("jscatalyst", () => "bubble-chart");

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(linqjs);
// localVue.use(VueSocketio);

describe("Bubble Chart PWA", () => {
  let store;
  let state = mockData;
  let comp;

  beforeEach(() => {
    store = new Vuex.Store({ state, getters, mutations, actions });
    comp = shallowMount(Bubble, { store, localVue });
  });

  afterEach(() => {
    comp.destroy();
  });

  test("renders a js catalyst bubble chart component", () => {
    expect(comp.vm.$children[0].$options._componentTag).toBe("bubble-chart");
  });

  test("prettyData() transforms data correctly", () => {
    const prettyData =
      comp.vm.$options._parentVnode.componentInstance.prettyData;
    const expected = [
      { x: "2018-02-11", y: 3, value: 1, label: "Date/severity" },
      { x: "2018-02-20", y: 3, value: 1, label: "Date/severity" }
    ];
    expect(prettyData).toEqual(expected);
  });

  describe("Getters", () => {
    test("data() returns data", () => {
      const result = getters.data(state);
      expect(result).toEqual(mockData.data);
    });
  });

  describe("Mutations", () => {
    test("addData() replaces state.data with fetched data", () => {
      const newData = [
        {
          date: "2018-02-20T20:27:40.000Z",
          raisedBy: 7887,
          project: "Cotton",
          severity: 1
        }
      ];
      mutations.addData(state, newData);
      expect(state.data).toEqual(newData);
    });
  });

  describe("Actions", () => {
    it("fetchData() calls axios.get", () => {
      const commit = jest.fn();
      actions.fetchData({ commit });
      expect(axios.get).toBeCalled;
    });

    it("fetchData() calls commit twice", () => {
      const commit = jest.fn();
      async () => {
        actions.fetchData({ commit });
        await expect(commit.mock.calls.length).toBe(2);
      };
    });

    it("fetchData() commits addData", () => {
      const commit = jest.fn();
      async () => {
        actions.fetchData({ commit });
        await expect(commit.mock.calls[0][0]).toBe("addData");
      };
    });
  });
});
