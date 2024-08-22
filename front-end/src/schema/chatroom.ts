import zod from "zod";

const chatroomSchema = zod.object({
    name: zod.string()
        .min(2, { message: "Name must be 2-50 characters." })
        .max(50, { message: "Name must be 2-50 characters." }),
    members: zod.array(zod.string())
})

export { chatroomSchema };
