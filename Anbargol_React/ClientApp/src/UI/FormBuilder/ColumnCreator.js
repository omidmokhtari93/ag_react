export const ColumnCreator = column => {
    switch (column) {
        case "1":
            return "col-md-12"
        case "2":
            return "col-md-6"
        case "3":
            return "col-md-4"
        case "4":
            return "col-md-3"
        case "6":
            return "col-md-2"
        case "12":
            return "col-md-1"
        default:
            "col-md-4"
    }
}