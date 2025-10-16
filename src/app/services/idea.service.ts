import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Idea, IdeaToSend } from '../types';
const API_URL = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  http = inject(HttpClient)
  fetchIdeas(limit?: number) {
    const params = new HttpParams()
    return this.http.get<Idea[]>(`${API_URL}/ideas`, { params: limit ? params.set('_limit', limit) : undefined })
  }
  fetchIdea(id: string) {
    return this.http.get<Idea>(`${API_URL}/ideas/${id}`)
  }
  deleteIdea(id: string) {
    return this.http.delete(`${API_URL}/ideas/${id}`)
  }
  createIdea(idea: IdeaToSend) {
    return this.http.post<Idea>(`${API_URL}/ideas`, { ...idea, createdAt: new Date().toISOString() })
  }
  updateIdea(id: string, idea: IdeaToSend) {
    return this.http.put<Idea>(`${API_URL}/ideas/${id}`, idea)
  }
}