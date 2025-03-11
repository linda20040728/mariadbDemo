import { Route } from "../abstract/Route"
import { ReservationsController } from "../controller/ReservationsController";

export class ReservationsRoute extends Route{
    
    protected url: string;
    protected Controller = new ReservationsController();

    constructor(){
        super()
        this.url = '/Reservations/'
        this.setRoutes()
    }

    protected setRoutes(): void {
        this.router.get(`${this.url}test`,(req, res)=>{
            this.Controller.test(req, res);
        })

        this.router.get(`${this.url}`, (req, res) => {
            this.Controller.getStudentReservations(req, res);
        });
    }
}