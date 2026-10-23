import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailabilityProduct, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"



const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo 49"
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 50
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
*             - in: path
*               name: id
*               description: The ID of the product to retrieve
*               required: true
*               schema: 
*                  type: integer
*          responses:   
*              200:
*                   description: Successful Response
*                   content:
*                       application/json:
*                           schema:
*                                $ref: '#/components/schemas/Product'    
*              400:
*                   description: Not Found
*                     
*              404:
*                   description: Bad Request - Invalid ID 
 */


router.get('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    getProductsById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 300
 *      responses:
 *          201:
*                   description: Successful Response
*                   content:
*                       application/json:
*                           schema:
*                                $ref: '#/components/schemas/Product'  
 *          400:
 *              description: Bad Request - Invalid input data
 */


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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns updated product
 *      parameters:
*             - in: path
*               name: id
*               description: The ID of the product to retrieve
*               required: true
*               schema: 
*                  type: integer
*      requestBody: 
*          required: true
*          content:
*              application/json:
*                  schema:
*                      type: object
*                      properties:
*                          name:
*                              type: string
*                              example: "Monitor Curvo 49 pulgadas"
*                          price:
*                              type: number
*                              example: 300
*                          availability:
*                              type: boolean
*                              example: true 
*      responses:   
*              200:
*                   description: Successful Response
*                   content:
*                       application/json:
*                           schema:
*                                $ref: '#/components/schemas/Product'    
*              400:
*                   description: Bad Request - Invalid ID or Invalid input data
*                     
*              404:
*                   description: Product Not Found 
*           
 */


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

/**
 * @swagger
 * /api/product/{id}:
 *  patch:
 *      summary: Update Product Availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
*             - in: path
*               name: id
*               description: The ID of the product to retrieve
*               required: true
*               schema: 
*                  type: integer
*      responses:   
*              200:
*                   description: Successful Response
*                   content:
*                       application/json:
*                           schema:
*                                $ref: '#/components/schemas/Product'    
*              400:
*                   description: Bad Request - Invalid ID
*                     
*              404:
*                   description: Product Not Found 
 */

router.patch('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    updateAvailabilityProduct
)


/**
 * @swagger
 * /api/product/{id}:
 *  delete:
 *      summary: Deletes a Product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message 
 *      parameters:
*             - in: path
*               name: id
*               description: The ID of the product to delete
*               required: true
*               schema: 
*                  type: integer
*      responses:   
*              200:
*                   description: Delete Successful 
*                   content:
*                       application/json:
*                           schema:
*                                type: string    
*                                value: 'Producto eliminado'    
*              400:
*                   description: Bad Request - Invalid ID
*                     
*              404:
*                   description: Product Not Found 
 */

router.delete('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    deleteProduct
)

export default router