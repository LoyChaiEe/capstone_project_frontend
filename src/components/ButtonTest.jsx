//This is an example of using it in a component where the text is dynamic
// if you need a test component like so, I would highly recommend using Storybook. Vital FE dev tool. However mocking the voicevox capability will not really be possible with that.
import { Button } from "antd";
import axios from "axios";
import { Howl } from "howler";

export default function AudioButton() {
  const speaker = 9;
  const play = async (e) => {
    const text = e.target.textContent;
    const data = await createAudio(text);
    const audioSRC = URL.createObjectURL(data);
    const sound = new Howl({
      src: [audioSRC],
      autoplay: false,
      loop: false,
      volume: 1,
      format: "wav",
    });
    sound.play();
  };

  const createQuery = async (text) => {
    //change speaker query to the id of the waifu
    const response = await axios.post(
      `http://localhost:50021/audio_query?speaker=${speaker}&text=${text}`
    );
    return response.data;
  };

  const createVoice = async (text) => {
    const query = await createQuery(text);
    const response = await axios.post(
      `http://localhost:50021/synthesis?speaker=${speaker}`,
      query,
      { responseType: "blob" }
    );
    return response.data;
  };

  const createAudio = async (text) => {
    const data = await createVoice(text);
    return data;
  };
  // return <Button onClick={play}>かえるぴょ</Button>;
  return <Button onClick={play}>振り向いて欲しくて背伸びをしてばかりで</Button>;
}
