import zod from "zod";

const messageSchema = zod.object({
    body: zod.string()
})

export { messageSchema };