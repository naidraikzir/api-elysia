CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`password` text,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);