import axios from "axios";

export function requestGetSong() {
  return axios.request({
    method: "get",
    url: "https://addissoftmusicapi.azurewebsites.net/song",
  })
}