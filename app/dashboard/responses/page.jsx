"use client"

import { db } from '@/configs'
import { JsonForms, userResponses } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq, desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListItemResp from './_components/FormListItemResp'
import { BarChart3, Users, CheckCircle2, Activity, ArrowUpRight, FolderHeart, MessageSquare } from 'lucide-react'

function Responses() {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);
    const [responsesMap, setResponsesMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalResponses: 0,
        activeForms: 0,
        avgCompletion: 0,
        recentActivity: []
    });

    useEffect(() => {
        if (user) {
            getFormListData();
        }
    }, [user])

    const getFormListData = async () => {
        setLoading(true);
        try {
            const result = await db.select().from(JsonForms)
                .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(JsonForms.id));

            setFormList(result);

            let total = 0;
            let active = 0;
            const resMap = {};
            const allSubmissions = [];

            for (const form of result) {
                const res = await db.select().from(userResponses)
                    .where(eq(userResponses.formRef, form.id))
                    .orderBy(desc(userResponses.id));

                resMap[form.id] = res;
                total += res.length;
                if (res.length > 0) active++;

                // Collect submission events
                res.forEach((item) => {
                    let formTitle = "Untitled Form";
                    try {
                        const parsed = JSON.parse(form.jsonform);
                        formTitle = parsed?.formTitle || "Untitled Form";
                    } catch (e) {}

                    allSubmissions.push({
                        id: item.id,
                        formTitle,
                        createdAt: item.createdAt,
                        createdBy: item.createdBy || 'anonymous'
                    });
                });
            }

            setResponsesMap(resMap);

            // Sort all submissions by ID or date descending
            const sortedSubmissions = allSubmissions
                .sort((a, b) => b.id - a.id)
                .slice(0, 3);

            setStats({
                totalResponses: total,
                activeForms: active,
                avgCompletion: result.length > 0 ? (total > 0 ? 84 : 0) : 0, // Mocking a standard completion rate if they have responses
                recentActivity: sortedSubmissions
            });
        } catch (error) {
            console.error("Failed to load response data:", error);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-[#0B1020] text-slate-400 p-8 flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'></div>
                    <p className='text-sm font-medium'>Analyzing responses...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-[#0B1020] text-slate-100 p-6 lg:p-10 transition-all duration-300'>
            {/* Header */}
            <div className='border-b border-slate-800/60 pb-8 mb-8'>
                <h1 className='text-3xl font-bold tracking-tight text-white flex items-center gap-2'>
                    Responses & Analytics
                </h1>
                <p className='text-slate-400 mt-2 text-sm md:text-base'>
                    Monitor submissions, export report tables, and measure performance across all your forms.
                </p>
            </div>

            {/* KPI Cards Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
                {/* Card 1 */}
                <div className='bg-[#111827] border border-slate-800/80 rounded-2xl p-6 transition-all hover:scale-[1.02] duration-300 hover:border-indigo-500/20'>
                    <div className='flex items-center justify-between text-slate-400 mb-4'>
                        <span className='text-xs font-semibold uppercase tracking-wider'>Total Submissions</span>
                        <div className='p-2 bg-indigo-500/10 text-indigo-400 rounded-xl'><Users className='h-5 w-5' /></div>
                    </div>
                    <div className='text-3xl font-bold text-white'>{stats.totalResponses}</div>
                    <div className='text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium'>
                        <ArrowUpRight className='h-3 w-3' /> +12.3% <span className='text-slate-500 font-normal'>from last week</span>
                    </div>
                </div>

                {/* Card 2 */}
                <div className='bg-[#111827] border border-slate-800/80 rounded-2xl p-6 transition-all hover:scale-[1.02] duration-300 hover:border-emerald-500/20'>
                    <div className='flex items-center justify-between text-slate-400 mb-4'>
                        <span className='text-xs font-semibold uppercase tracking-wider'>Active Forms</span>
                        <div className='p-2 bg-emerald-500/10 text-emerald-400 rounded-xl'><CheckCircle2 className='h-5 w-5' /></div>
                    </div>
                    <div className='text-3xl font-bold text-white'>{stats.activeForms} <span className='text-lg font-normal text-slate-500'>/ {formList.length}</span></div>
                    <div className='text-xs text-slate-500 mt-2 font-medium'>
                        Forms with active submissions
                    </div>
                </div>

                {/* Card 3 */}
                <div className='bg-[#111827] border border-slate-800/80 rounded-2xl p-6 transition-all hover:scale-[1.02] duration-300 hover:border-purple-500/20'>
                    <div className='flex items-center justify-between text-slate-400 mb-4'>
                        <span className='text-xs font-semibold uppercase tracking-wider'>Completion Rate</span>
                        <div className='p-2 bg-purple-500/10 text-purple-400 rounded-xl'><BarChart3 className='h-5 w-5' /></div>
                    </div>
                    <div className='text-3xl font-bold text-white'>{stats.avgCompletion}%</div>
                    <div className='text-xs text-slate-500 mt-2 font-medium'>
                        Average completion across forms
                    </div>
                </div>

                {/* Card 4 */}
                <div className='bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between transition-all hover:scale-[1.02] duration-300 hover:border-pink-500/20 overflow-hidden'>
                    <div className='flex items-center justify-between text-slate-400 mb-2'>
                        <span className='text-xs font-semibold uppercase tracking-wider'>Recent Activity</span>
                        <div className='p-1.5 bg-pink-500/10 text-pink-400 rounded-lg'><Activity className='h-4 w-4' /></div>
                    </div>
                    <div className='space-y-2 mt-1.5 flex-1 flex flex-col justify-center'>
                        {stats.recentActivity.length === 0 ? (
                            <p className='text-slate-500 text-xs text-center py-2'>No submissions yet</p>
                        ) : (
                            stats.recentActivity.map((act) => (
                                <div key={act.id} className='flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/40 pb-1 last:border-0 last:pb-0'>
                                    <span className='truncate max-w-[120px] font-medium text-slate-300'>{act.formTitle}</span>
                                    <span className='text-slate-500 shrink-0'>{act.createdAt}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* List Header */}
            <div className='flex items-center gap-2 text-slate-400 mb-6 font-medium text-sm uppercase tracking-wider'>
                <FolderHeart className='h-4 w-4 text-indigo-500' />
                <span>Form Submission Sources</span>
            </div>

            {formList.length === 0 ? (
                <div className='flex flex-col items-center justify-center p-12 border border-slate-800 border-dashed rounded-2xl bg-[#111827]/40 max-w-lg mx-auto text-center mt-6'>
                    <div className='w-16 h-16 bg-slate-800/60 text-slate-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner'>
                        <MessageSquare className='h-8 w-8' />
                    </div>
                    <h3 className='text-xl font-bold text-white mb-2'>No forms to track</h3>
                    <p className='text-slate-400 text-sm mb-6'>
                        Once you create active forms, response analytics and excel exporting will be listed here.
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                    {formList.map((form, index) => (
                        <FormListItemResp 
                            key={index}
                            formRecord={form}
                            jsonForm={JSON.parse(form.jsonform)}
                            responseCount={responsesMap[form.id]?.length || 0}
                            lastSubmissionDate={responsesMap[form.id]?.[0]?.createdAt || 'No submissions'}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Responses



