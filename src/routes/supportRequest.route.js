const express = require('express')
const validate = require('../middlewares/validate.middleware')
const supportTicketValidation = require('../validations/supportTicket.validations')
const supportRequestController = require('../controllers/supportRequest.controller')
const auth =  require('../middlewares/auth.middleware')
const commentValidation = require('../validations/comment.validations')
const commentController = require('../controllers/comment.controller')
const router = express.Router()

router
    .route('/')
    .post(auth('createSupportRequest'), validate(supportTicketValidation.createSupportRequest), supportRequestController.createRequest )
    .get(auth('manageSupportTickets'), supportRequestController.getSupportRequests)

router
    .route('/export')
    .get(validate(supportTicketValidation.exportRequests), supportRequestController.exportSupportRequest)


router
    .route('/:requestId')
    .get(auth( 'getRequest'), validate(supportTicketValidation.getSupportRequest), supportRequestController.getSupportRequest)
    .patch(auth('modifyRequest'), validate(supportTicketValidation.updateSupportRequest), supportRequestController.updateSupportRequest )


router.route('/:requestId/comments')
    .post(auth('canComment'), validate(commentValidation.createComment), commentController.addComment)
    .get(auth('canComment'), validate(commentValidation.getComments), commentController.getComments)

router
    .route('/:requestId/comments/:commentId')
    .get(auth('canComment'), validate(commentValidation.getComment), commentController.getComment)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: SupportRequest
 *   description: SupportRequest management and retrieval
 */

/**
 * @swagger
 * path:
 *  /api/support-requests:
 *    post:
 *      summary: Create a Support request
 *      description: Only customers can create support request.
 *      tags: [SupportRequest]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - description
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                  format: email
 *                  description: description of what the issue is
 *                userId:
 *                  type: string
 *                  description: the user who created the request
 *                requestStatus:
 *                   type: string
 *                   enum: [CLOSED, PENDING. WAITING]
 *              example:
 *                title: The Sun has refused to come out
 *                description: woke up this morning and discovered the sun is taking vacation
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/SupportRequest'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all support requests
 *      description: only admins and support agent can get all support requests
 *      tags: [SupportRequest]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                items:
*                   $ref: '#/components/schemas/SupportRequest'
 *
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /api/support-request/{id}:
 *    get:
 *      summary: Get a Support request
 *      description: geta support request given its id
 *      tags: [SupportRequest]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: requestId
 *          required: true
 *          schema:
 *            type: string
 *          description: support request id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/SupportRequest'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a Support request
 *      description: modify either the title or description of the support request
 *      tags: [SupportRequest]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: request id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                  description: description of the support rewuest
 *              example:
 *                title: fake title
 *                description: new description
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/SupportRequest'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */



/**
 * @swagger
 * tags:
 *   name: Comment
 *   description:  management and retrieval of comments made on a support request
 */

/**
 * @swagger
 * path:
 *  /api/support-requests/{requestId}/comments:
 *    post:
 *      summary: Create a comment on a Support request
 *      description: Only support agents are allowed to comment first on a support request.
 *      tags: [Comment]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: requestId
 *          required: true
 *          schema:
 *            type: string
 *          description: support request id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - comment
 *              properties:
 *                comment:
 *                   type: string
 *                   description: the comment to be made
 *              example:
 *                comment: Have you trued begging the sun
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Comment'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all support request's comments
 *      description:
 *      tags: [Comment]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: requestId
 *            required: true
 *            schema:
 *              type: string
 *              description: support request id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                   $ref: '#/components/schemas/Comment'
 *
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /api/support-request/{requestId}/comments/{commentId}:
 *    get:
 *      summary: Get a Support request comment
 *      description: get a support request comment given its id
 *      tags: [Comment]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: requestId
 *          required: true
 *          schema:
 *            type: string
 *          description: support request id
 *        - in: path
 *          name: commentId
 *          required: true
 *          schema:
 *            type: string
 *          description: support request comment's id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Comment'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 */


/**
 * @swagger
 * path:
 *  /api/support-request/export:
 *    get:
 *      summary: Get a comma separated values of all the support request in a given time frame
 *      description: Get a comma separated values of all the support request in a given time frame
 *      tags: [Download requests]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: startDate
 *          required: false
 *          schema:
 *            type: string
 *            format: date-time
 *          description: The date to start from
 *        - in: query
 *          name: endDate
 *          required: false
 *          schema:
 *            type: string
 *            format: date-time
 *          description: the date to end exporting
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: type of sorting , 'asc' for ascending and 'desc' for descending. fields are sorted by createdDate
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            text/csv:
 *              schema:
 *                 $ref: '#/components/schemas/SupportRequest'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 */



