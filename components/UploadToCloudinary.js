import React, { Component } from "react";
import env from "../env.json";

export default class UploadToCloudinary extends Component {
  state = {
    image: "",
    largeImage: "",
    imageSizes: [],
    imageIsLoading: false,
  };

  uploadFile = async (e) => {
    this.setState({ imageIsLoading: true });
    const { liftState } = this.props;
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "beowulf");
    const res = await fetch(env.cloudinaryURL, { method: "POST", body: data });
    const file = await res.json();
    this.setState(
      {
        image: file.secure_url,
        largeImage: file.eager[0].secure_url,
        imageSizes: [...file.eager.map((image) => image.secure_url)],
        imageIsLoading: false,
      },
      () => liftState && liftState(this.state)
    );
  };

  render() {
    return (
      <label htmlFor="file">
        <h3>Image</h3>
        <input
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          required
          onChange={this.uploadFile}
        />
        {this.state.imageIsLoading ? (
          <p>Loading Your Image...</p>
        ) : this.state.image ? (
          <img width="200" src={this.state.image} alt="Upload Preview" />
        ) : null}
      </label>
    );
  }
}
