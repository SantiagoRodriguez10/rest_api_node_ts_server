import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailabilityProduct, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"
const router = Router()

//Routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    getProductsById
)


router.post('/',

    //Validación 
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de producto no puede ir vacío')
        .custom(value => value > 0).withMessage('El precio de producto no es válido'),
    handleInputErrors,
    createProduct
)


router.put('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de producto no puede ir vacío')
        .custom(value => value > 0).withMessage('El precio de producto no es válido'),
    body('availability')
        .isBoolean().withMessage('Valor para la disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    updateAvailabilityProduct
)
router.delete('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    deleteProduct
)

export default router