import { Upload, Form } from 'antd';
import ImgCrop from 'antd-img-crop';
import useImagePreview from '../hooks/useImagePreview';

const UploadingImageInput = ({ value = [], onChange, disabled }) => {
    const handlePreview = useImagePreview();

    const triggerChange = (newFileList) => {
        onChange?.(newFileList);
    };

    const handleChange = ({ fileList: newFileList }) => {
        triggerChange(newFileList);
    };

    return (
        <ImgCrop rotationSlider>
            <Upload
                listType="picture-card"
                fileList={value}
                onChange={handleChange}
                onPreview={handlePreview}
                disabled={disabled}
            >
                {value.length < 1 && '+ Upload'}
            </Upload>
        </ImgCrop>
    );
};

export default UploadingImageInput;
