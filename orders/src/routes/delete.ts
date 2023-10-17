import express, { Request, Response } from 'express';
import { NotAuthroizedError, NotFoundError, requireAuth } from '@ryuju-ticketing/common';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthroizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    // TODO: Publish an event saying that the order was cancelled.
    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
