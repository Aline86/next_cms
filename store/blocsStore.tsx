import { create } from "zustand";
import SnippetTypes from "../lib/snippet_types";
import ComponentTypes from "../lib/types";
import InputTypes from "../lib/InputTypes";
import PageModel from "../models/Page";
import Header from "../models/Header";
import Footer from "../models/FooterData";

type BlocStoreState = {
  blocs: ComponentTypes[];
  highlight: number | undefined | null;
  modified_blocs: ComponentTypes[];
};

const useBlocStore = create<
  BlocStoreState & {
    setBlocs: (newBlocs: ComponentTypes[]) => void;
    saveBlocAll: () => void;
    addBloc: (bloc: ComponentTypes) => void;
    addItem: (bloc: ComponentTypes) => void;
    saveBloc: (bloc: ComponentTypes) => void;
    updateBloc: (
      event: InputTypes,
      field: string | undefined,
      input?: string | undefined,
      index?: undefined | string | number,
      component?: ComponentTypes
    ) => Promise<void>;
    removeItem: (bloc: ComponentTypes, _index: number) => Promise<void>;
    removeBloc: (id: number) => void;
    getBlocs: () => ComponentTypes[];
    getHightlight: () => number | undefined | null;
  }
>((set, get) => ({
  blocs: [],
  modified_blocs: [],
  highlight: null,
  // Set all blocs (e.g., from API)
  setBlocs: (newBlocs: ComponentTypes[]) => set({ blocs: newBlocs }),
  // Add a new bloc
  addBloc: (bloc: ComponentTypes) =>
    set((state: BlocStoreState) => ({
      blocs: [...state.blocs, bloc],
    })),
  // Add item (implement as needed, here just adds like addBloc)
  addItem: async (bloc: ComponentTypes) => {
    if (!("add_data" in bloc && typeof bloc.add_data === "function")) {
    } else {
      const plainObj = bloc.add_data();
      if (plainObj !== undefined) {
        bloc.hydrate(plainObj);
        set((state: BlocStoreState) => ({
          blocs: state.blocs.map((bloc, index) =>
            state.blocs[index].bloc_number === plainObj.bloc_number
              ? plainObj
              : bloc
          ) as ComponentTypes[],
        }));
      }
    }
  },
  saveBloc: async (bloc: ComponentTypes) => {
    await bloc.save_bloc().then(async (plainObj) => {
      if (plainObj !== undefined) {
        bloc.hydrate(plainObj);
        set((state: BlocStoreState) => ({
          blocs: state.blocs.map((bloc_data) =>
            bloc_data.bloc_number === bloc.bloc_number
              ? { ...bloc_data, ...bloc }
              : bloc
          ) as SnippetTypes[],
        }));
      }
    });
  },
  // Update a bloc by ID
  updateBloc: async (
    event: InputTypes,
    field: string | undefined,
    input?: string | undefined,
    index?: undefined | string | number,
    component?: ComponentTypes
  ): Promise<void> => {
    if (
      component !== undefined &&
      component !== null &&
      !(component instanceof PageModel)
    ) {
      const result = await component.update(
        event,
        field !== undefined ? field : "",
        input,
        typeof index === "number"
          ? index
          : index !== undefined
          ? Number(index)
          : undefined
      );

      if (result !== undefined && result !== null) {
        // Garder etats des blocs modifiés pour les envois et optimisation du nombre de requêtes
        // Vérifier si le bloc existe déjà dans les blocs modifiés
        set((state) => {
          const blocExists = state.modified_blocs.some(
            (bloc) => bloc.bloc_number === result.bloc_number
          );

          let updatedBlocs;

          if (blocExists) {
            // Remplacer le bloc existant
            updatedBlocs = state.modified_blocs.map((bloc) =>
              bloc.bloc_number === result.bloc_number ? result : bloc
            );
          } else {
            // Ajouter le nouveau bloc
            updatedBlocs = [...state.modified_blocs, result];
          }

          return { modified_blocs: updatedBlocs };
        });
        // Mettre à jour le bloc à ouvrir après refresh
        set((state: BlocStoreState) => {
          const position = state.blocs.findIndex(
            (bloc) => bloc.bloc_number === result.bloc_number
          );
          return { highlight: position !== -1 ? position : null };
        });
        set((state: BlocStoreState) => ({
          blocs: state.blocs.map((bloc, index) =>
            state.blocs[index].bloc_number === result.bloc_number
              ? result
              : bloc
          ) as ComponentTypes[],
        }));
      }
    }
  },
  removeItem: async (bloc: ComponentTypes, _index: number) => {
    if ("remove_data" in bloc && typeof bloc.remove_data === "function") {
      const result = await bloc.remove_data(_index);
      if (result !== undefined) {
        set((state: BlocStoreState) => ({
          blocs: state.blocs.map((bloc, index) =>
            state.blocs[index].bloc_number === result.bloc_number
              ? result
              : bloc
          ) as ComponentTypes[],
        }));
      }
    }
  },

  // Remove a bloc
  removeBloc: async (id: number) => {
    const page = new PageModel(1, 1, null);
    const blocs = get().blocs;

    // On supprime d'abord le bloc via remove()

    if (
      blocs[id].bloc_number === id &&
      "remove" in blocs[id] &&
      typeof blocs[id].remove === "function" &&
      !(blocs[id] instanceof Header) &&
      !(blocs[id] instanceof Footer)
    ) {
      await blocs[id].remove();
    }

    // On filtre les blocs sans celui à supprimer
    const blocs_without_deleted_bloc = blocs.filter(
      (bloc) => bloc.bloc_number !== id
    );

    // On réindexe les blocs
    blocs_without_deleted_bloc.map((_, index) => {
      blocs_without_deleted_bloc[index].set_bloc_number(index);
    });

    const result = await page.send_blocs(blocs_without_deleted_bloc);
    if (result !== undefined) {
      set(() => ({
        blocs: blocs_without_deleted_bloc,
      }));
    }
  },

  getHightlight: () => get().highlight,
  getBlocs: () => get().blocs,
  saveBlocAll: async () => {
    const blocs = get().modified_blocs;
    const page = new PageModel(1, 1, null);
    await page.send_blocs(blocs);
    blocs.map(async (bloc: ComponentTypes, index: number) => {
      if (bloc.type === "header" || bloc.type === "footer") {
        const result = await bloc.save_bloc();
        if (result !== undefined) {
          blocs[index] = result as ComponentTypes;
        }
      } else {
        blocs[index] = bloc as ComponentTypes;
      }
    });
  },
}));

export default useBlocStore;
