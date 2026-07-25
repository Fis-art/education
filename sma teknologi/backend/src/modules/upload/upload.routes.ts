import { Router } from 'express'
import { uploadController } from './upload.controller'
import { uploadSingleImage, uploadMultipleImages, uploadSingleFile } from './upload.controller'
import { validate } from '@middlewares/validate'
import { uploadImageSchema, uploadImagesSchema, uploadFileSchema } from './upload.validator'

const router = Router()

router.post('/image', uploadSingleImage, validate(uploadImageSchema), uploadController.uploadImage)
router.post('/images', uploadMultipleImages, validate(uploadImagesSchema), uploadController.uploadImages)
router.post('/file', uploadSingleFile, validate(uploadFileSchema), uploadController.uploadFile)

export const uploadRoutes = router