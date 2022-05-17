import { Order } from "sequelize/types";
import RepositoryInterface from "../../@shared/repository/repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> { }
