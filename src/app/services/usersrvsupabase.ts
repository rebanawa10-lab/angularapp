import { Injectable } from '@angular/core';


import { createClient } from '@supabase/supabase-js';

import { SupabaseClient } from '@supabase/supabase-js';

// Do NOT create the client outside Angular DI if env may be undefined at build.
import { environment } from '../../../src/environments/environment';


// Add apikey Manually (RAW HTTP – for testing only)
// Use this only if you are calling REST directly (not Supabase JS).
import { HttpClient, HttpHeaders } from '@angular/common/http';   


export type NewUser = Omit<User, 'id' | 'editing'>;


export interface User {
  id: number;
  name: string;
  email: string;

  // UI-only field (NOT stored in DB)
  editing?: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class Usersrvsupabase  {

  private supabase: SupabaseClient;


  constructor(
    private http: HttpClient    // ✅ Inject here, // Add apikey Manually (RAW HTTP – for testing only)
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    console.log('URL:', environment.supabaseUrl);
    console.log('KEY:', environment.supabaseKey?.slice(0, 10));

  }

  // DONT DELETE:
  // Test API. This working.
  // Add apikey Manually (RAW HTTP – for testing only)
  // This working. 
  // uses raw HttpClient + headers
  testApi() {
      const headers = new HttpHeaders({
        apikey: environment.supabaseKey,
        Authorization: `Bearer ${environment.supabaseKey}`
      });

      this.http.get(
        `${environment.supabaseUrl}/rest/v1/users?select=*`,
        { headers }
      ).subscribe(res => {
        console.log(res);
      });
  }

  // using Supabase JS
  async getUsers() {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .order('id');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

    return data;
  }

  // VER1
  // async addUser(user: any) {
  //   const { data, error } = await this.supabase
  //     .from('users')
  //     .insert(user)
  //     .select()
  //     .single();

  //   if (error) throw error;
  //   return data;
  // }

  // VER2
  async addUser(user: NewUser) {
  const { data, error } = await this.supabase
    .from('users')
    .insert(user)
    .select()
    .single();

    if (error) throw error;
    return data as User;
  }



  async deleteUser(id: number) {
    const { error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }


  // REALTIME SUBSCRIPTION
  subscribeRealtime(callback: (payload: any) => void) {
      return this.supabase
      .channel('users-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        payload => callback(payload)
      )
      .subscribe();
  }


  // VER1
  // async updateUser(user: any) {
  //   const { data, error } = await this.supabase
  //     .from('users')
  //     .update(user)
  //     .eq('id', user.id)
  //     .select()
  //     .single();

  //   if (error) throw error;
  //   return data;
  // }

  // VER2
  async updateUser(user: User) {
      const { data, error } = await this.supabase
      .from('users')
      .update({
        name: user.name,
        email: user.email
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
  
}
