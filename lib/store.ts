import {createStore,action} from 'easy-peasy'
const store = createStore({
  activeSongs:[],
  activeSong:null,
  changeActiveSongs:action((state,payload)=>{
    state.activeSongs= payload;
  }), 
   changeActiveSong:action((state,payload)=>{
    state.activeSong= payload;
  }), 

})
export default store
// lib/store.ts
export interface StoreModel {
  changeActiveSong: (song) => void;
}
// lib/store/model.ts

export interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  // Add more fields as needed
}

export interface Model {
  activeSongs: Song[];
  activeSong: Song | null;
}
