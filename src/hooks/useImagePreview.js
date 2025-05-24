const useImagePreview = () => {
  const handlePreview = async (file) => {
    let src = file.url;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    if (!src) return;
    const imgWindow = window.open('', '_blank');
    if (imgWindow) {
      imgWindow.document.body.style.margin = '0';
      const img = imgWindow.document.createElement('img');
      img.src = src;
      img.style.maxWidth = '100vw';
      img.style.maxHeight = '100vh';
      img.style.display = 'block';
      img.style.margin = 'auto';
      imgWindow.document.body.appendChild(img);
      imgWindow.document.title = 'Preview';
    }
  };

  return handlePreview;
};

export default useImagePreview;