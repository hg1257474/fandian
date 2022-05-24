import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/table', controller.home.index);
  router.post('/table', controller.home.index);
  router.put('/table', controller.home.index);
  router.delete('/table', controller.home.index);
  router.get('/stock', controller.home.index);
  router.post('/stock', controller.home.index);
  router.put('/stock', controller.home.index);
  router.delete('/stock', controller.home.index);
  router.get('/product', controller.home.index);
  router.post('/product', controller.home.index);
  router.put('/product', controller.home.index);
  router.delete('/product', controller.home.index);
};
