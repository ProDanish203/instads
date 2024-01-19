import CredentialsProvider from "next-auth/providers/credentials"
import { connectDb } from "@/lib/config/db";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
            username: { label: 'username', type: 'text'},
            password: { label: 'password', type: 'password'},
        },
        async authorize(credentials){
            if(!credentials?.username || !credentials?.password){
                throw new Error('Invalid Credentials');
            }

            await connectDb();
            
            const user = await User.findOne({username: credentials.username}); 
            if(!user) throw new Error('Invalid Credentials');

            const checkPass = await bcrypt.compare(credentials.password, user.password)
            if(!checkPass) throw new Error('Invalid Credentials');

            return user;
        }
    })
    ],
    debug: process.env.NODE_ENV === "development",
    session:{
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET 
    },
    secret: process.env.NEXTAUTH_SECRET
}
 

export const getAuthSession = () => getServerSession(authOptions);