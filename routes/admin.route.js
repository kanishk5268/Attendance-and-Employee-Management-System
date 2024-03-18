import { Router } from 'express';

const adminRoute = Router();

adminRoute.post('/registUser',addUser)

export default adminRoute;