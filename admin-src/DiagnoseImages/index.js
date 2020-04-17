import React, { useState, memo } from 'react'
import ImgsViewer from 'react-images-viewer'
import classes from './styles.css'

const DiagnoseImages = ({ images, imageClassname = classes.diagnoseImage }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const goToNext = () => setCurrentImage(currentImage + 1)
  const goToPrevious = () => setCurrentImage(currentImage - 1)
  const goToImage = (index) => setCurrentImage(index)
  const onClose = () => {
    setCurrentImage(0)
    setIsOpen(false)
  }

  const openImageViewer = (index, event) => {
    event.preventDefault()
    setCurrentImage(index)
    setIsOpen(true)
  }

  return (
    images && (
      <>
        <div>
          {images && images.map((image, index) => (
            <a
              href={image.src}
              key={index}
              onClick={(event) => openImageViewer(index, event)}
            >
              <img className={imageClassname} src={image.src} />
            </a>
          ))}
        </div>
        <ImgsViewer
          imgs={images}
          currImg={currentImage}
          isOpen={isOpen}
          onClickNext={goToNext}
          onClickPrev={goToPrevious}
          onClickThumbnail={goToImage}
          onClose={onClose}
          leftArrowTitle='Previous'
          rightArrowTitle='Next'
          closeBtnTitle='Close'
        />
      </>
    )
  )
}

export default memo(DiagnoseImages)
