import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { ModualPop } from '../../../../../../common/Components/module-pop/ModualPop';
import "./style.css";
import Slider from 'rc-slider';

interface prop {
  CanvasWidth: number,
  isCircle: boolean,
  file: any,
  name: string,
  modifyAllowed: boolean,
  CanvasHeight: number,
  setImages: (data: any) => any
}

const marks = {
  0: '0',
  0.2: '2',
  0.4: '4',
  0.6: '6',
  0.8: '8',
  1: '10',
  1.2: '12',
  1.4: '14',
  1.6: '16',
  1.8: '18',
  2: '20',
};


const ImageUploaderWithCrop = (props: prop) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [imgRotate, setImgRotate] = useState(0);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setIsCropping(file ? true : false);
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL();
      props.setImages((prev: any) => {
        return {...prev, [props.name]: {...prev[props.name], file: croppedImageUrl}}
      });
      setIsCropping(false);
      //setCroppedImage(croppedImageUrl);
    }
  };

  const onChangeScale = (data: any) => {
    setScale(data[0]);
  }

  const clearImage = () => {
    setSelectedFile(null);
    props.setImages((prev: any) => {
      return {...prev, [props.name]: {...prev[props.name], file: ""}}
    });
  }

  return (
    <div>
      {props.file === "" ? 
      <div className='desgine-upload-button'>
        <input accept="image/*" name="viewLive" onChange={handleFileChange} id={props.name} type="file" hidden/>
        <label htmlFor={props.name}><i className="bi bi-upload"></i> Change Image</label>
      </div> : 
      <div className='desgine-upload-button'>
        {props.modifyAllowed && <button className="modi-btn" onClick={() => setIsCropping(true)} type='button'><i className="bi bi-pencil-square"></i>Modify</button>}
        <button className="rem-btn" onClick={clearImage} type="button"><i className="bi bi-trash3" ></i> Remove</button>
      </div>}
      <ModualPop show={isCropping} child={
        selectedFile && <div className='crop-container-main'>
        <h2>Edit your image</h2>
        <div className='image-rotator-upload-portal'>
          <button onClick={() => setImgRotate(prev => prev - 90)}><i className="bi bi-arrow-counterclockwise"></i>Rotate left</button>
          <button onClick={() => setImgRotate(prev => prev + 90)}><i className="bi bi-arrow-clockwise"></i>Rotate right</button>
        </div>
          <AvatarEditor
            ref={(editorRef) => setEditor(editorRef)}
            image={URL.createObjectURL(selectedFile)}
            width={props.CanvasWidth}
            height={props.CanvasHeight}
            border={50}
            borderRadius={props.isCircle ? 125 : 0}
            scale={scale}
            rotate={imgRotate}
          />
          <div className='slider-content-scale'>
            <Slider min={0} onChange={onChangeScale} max={2} value={scale} marks={marks} range />
          </div>
          <div className='action-button-crop-container'>
            <button onClick={() => setIsCropping(false)} type='button'>Close</button>
            <button onClick={handleSave} type='button'>Save Changes</button>
          </div>
        </div>
      }/>
    </div>
  );
};

export default ImageUploaderWithCrop;
