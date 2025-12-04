exports.pagination = (page, numberOfDocuments, limit, skip) => {

    const pagination = {
        currentPage: parseInt(page),
    }
    
    if (page) {
        pagination.currentPage = parseInt(page);
        pagination.numberOfPages = Math.ceil(numberOfDocuments / parseInt(page))
    }

    if (page * limit < numberOfDocuments) {
        pagination.next = parseInt(page) + 1;
    }

    if (skip > 0) {
        pagination.prev = parseInt(page) - 1;
    }

    return pagination;
}