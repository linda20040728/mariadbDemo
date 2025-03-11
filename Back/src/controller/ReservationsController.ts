import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { ReservationsService } from "../Service/ReservationsService";
import { PageService } from "../Service/PageService";
import { DB } from "../app";
require('dotenv').config()

export class ReservationsController extends Controller {
    protected service: ReservationsService;

    constructor() {
        super();
        this.service = new ReservationsService();
    }

    public async test(Request: Request, Response: Response) {
        await DB.connection?.query("USE lab_b310;");
        const resp = await DB.connection?.query("SELECT * FROM Reservations;");
        Response.send(resp)
    }

    public async getStudentReservations(Request: Request, Response: Response) {
        try {
            const reservations = await this.service.getStudentReservations();
            Response.json({
                data: reservations
            });
        } catch (error) {
            logger.error(`Error fetching reservations: ${error}`);
            Response.status(500).json({
                message: "無法獲取預約紀錄"
            });
        }
    }
}