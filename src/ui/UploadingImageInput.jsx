import { Upload, Form } from 'antd';
import ImgCrop from 'antd-img-crop';

const UploadingImageInput = ({ value = [], onChange }) => {
    const triggerChange = (newFileList) => {
        onChange?.(newFileList);
    };

    const handleChange = ({ fileList: newFileList }) => {
        triggerChange(newFileList);
    };

    const handlePreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <ImgCrop rotationSlider>
            <Upload
                listType="picture-card"
                fileList={value}
                onChange={handleChange}
                onPreview={handlePreview}
            >
                {value.length < 1 && '+ Upload'}
            </Upload>
        </ImgCrop>
    );
};

export default UploadingImageInput;
