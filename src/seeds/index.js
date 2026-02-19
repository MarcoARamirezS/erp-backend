import { seedPermissions } from './permissions.seed.js'
import { seedRoles } from './roles.seed.js'
import { seedAdminUser } from './users.seed.js'

export async function runSeeds() {
  const allPermissions = await seedPermissions()
  const roles = await seedRoles({ allPermissions })
  const admin = await seedAdminUser()
  return { permissions: allPermissions.length, roles, admin }
}

// Permite: npm run seed
if (process.argv[1]?.endsWith('/src/seeds/index.js')) {
  runSeeds()
    .then((r) => console.log('✅ Seeds ok', r))
    .catch((e) => {
      console.error('❌ Seed error', e)
      process.exit(1)
    })
}
