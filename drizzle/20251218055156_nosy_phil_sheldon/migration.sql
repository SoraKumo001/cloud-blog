CREATE TABLE "Category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_CategoryToPost" (
	"postId" uuid,
	"categoryId" uuid,
	CONSTRAINT "_CategoryToPost_pkey" PRIMARY KEY("postId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "FireStore" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"mimeType" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_FireStoreToPost" (
	"postId" uuid NOT NULL,
	"fireStoreId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"published" boolean NOT NULL,
	"title" text DEFAULT 'New Post' NOT NULL,
	"content" text NOT NULL,
	"authorId" uuid NOT NULL,
	"cardId" text,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL,
	"publishedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "System" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"iconId" text,
	"cardId" text,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"name" text DEFAULT 'User' NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_postId_Post_id_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_categoryId_Category_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_FireStoreToPost" ADD CONSTRAINT "_FireStoreToPost_postId_Post_id_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_FireStoreToPost" ADD CONSTRAINT "_FireStoreToPost_fireStoreId_FireStore_id_fkey" FOREIGN KEY ("fireStoreId") REFERENCES "FireStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_User_id_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Post" ADD CONSTRAINT "Post_cardId_FireStore_id_fkey" FOREIGN KEY ("cardId") REFERENCES "FireStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "System" ADD CONSTRAINT "System_iconId_FireStore_id_fkey" FOREIGN KEY ("iconId") REFERENCES "FireStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "System" ADD CONSTRAINT "System_cardId_FireStore_id_fkey" FOREIGN KEY ("cardId") REFERENCES "FireStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;