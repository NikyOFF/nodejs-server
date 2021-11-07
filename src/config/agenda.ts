export default {
    DATABASE_COLLECTION: process.env.AGENDA_DATABASE_COLLECTION,
    CONCURRENCY: parseInt(process.env.AGENDA_CONCURRENCY, 10),
}