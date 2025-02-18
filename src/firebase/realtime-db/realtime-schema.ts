import { doc, collection } from 'firebase/firestore';
import { realtime_db } from '../firebase-sdk';


const rt_users = collection(realtime_db, 'users');

const rt_user = doc(rt_users, 'user');

const rt_projects = collection(realtime_db, 'projects');

const rt_chapters = collection(realtime_db, 'chapters');

const rt_scenes = collection(realtime_db, 'scenes');

const rt_prompts = collection(realtime_db, 'prompts');

const rt_beats = collection(realtime_db, 'beats');

const rt_entities = collection(realtime_db, 'entities');

const rt_entity_mentions = collection(realtime_db, 'entity_mentions');

const rt_inspirations = collection(realtime_db, 'inspirations');

const rt_lore = collection(realtime_db, 'lore');

const rt_synopsis = collection(realtime_db, 'synopsis');

const rt_world = collection(realtime_db, 'world');


export { rt_users, rt_user, rt_projects, rt_chapters, rt_scenes, rt_prompts, rt_beats, rt_entities, rt_entity_mentions, rt_inspirations, rt_lore, rt_synopsis, rt_world };