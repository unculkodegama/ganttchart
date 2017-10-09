export class Task {
    constructor(
        public id: string,
        public parentId: string,
        public nameOfTask: string,
        public dateOfCreation: string,
        public startDate: string,
        public endDate: string
    ){}
}
