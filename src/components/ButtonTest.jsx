//This is an example of using it in a component where the text is dynamic
import { Button } from "antd";
import axios from "axios";
import { Howl } from "howler";

export default function AudioButton(){
  const play = async (e) => {
    const text = e.target.textContent;
    console.log(text)
    const data = await createAudio(text);
    const audioSRC = URL.createObjectURL(data);
    console.log(audioSRC)
    const sound = new Howl({
      src: [audioSRC],
      autoplay: true,
      loop: false,
      volume: 1,
      format: "wav"
    });
    sound.play();
  }

  const createQuery = async (text) => {
    const response = await axios.post(
      `http://localhost:50021/audio_query?speaker=1&text=${text}`
    );
    return response.data;
  };

  const createVoice = async(text) =>{
    const query = await createQuery(text);
    const response = await axios.post(
      "http://localhost:50021/synthesis?speaker=1",
      query,
      { responseType: "blob" }
    );
    return response.data;
  }

  const createAudio = async (text) => {
    const data = await createVoice(text);
    return data;
  }
  return (
    <Button onClick={play}>
      他方、成績評価の甘い授業が高く評価されたり、人気取りに走る教師が出たりし、成績の安売りや大学教師のレベルダウンという弊害をもたらす恐れがある、などの反省意見もある.
    </Button>
  );
}