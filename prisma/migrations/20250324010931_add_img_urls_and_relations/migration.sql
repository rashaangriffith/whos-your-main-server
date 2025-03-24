-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "GameCharacter" ADD COLUMN     "imageUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCharacter" ADD CONSTRAINT "GameCharacter_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCharacter" ADD CONSTRAINT "GameCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameCharacter" ADD CONSTRAINT "UserGameCharacter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameCharacter" ADD CONSTRAINT "UserGameCharacter_gameCharacterId_fkey" FOREIGN KEY ("gameCharacterId") REFERENCES "GameCharacter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
