/**
 * api接口的统一出口
 */

// 模块接口
import common from '@/api/common';
import privilege from '@/api/privilege';
import module from '@/api/module';
import user from '@/api/user';
import operate from '@/api/operate';
import role from '@/api/role';
import logoperate from '@/api/logoperate';
import loglogin from '@/api/loglogin';
import organization from '@/api/organization';
import dictionary from '@/api/dictionary';

// 导出接口
export default {
  common,
  privilege,
  module,
  user,
  operate,
  role,
  logoperate,
  loglogin,
  organization,
  dictionary,
  // ……
};
