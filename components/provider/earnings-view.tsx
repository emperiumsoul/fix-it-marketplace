"use client";

import * as React from "react";
import {
  Wallet,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export interface EarningsViewProps {
  onWithdrawToast?: (msg: string) => void;
  availableBalance?: number;
  pendingEscrow?: number;
  lifetimeEarned?: number;
  transactions?: Array<{
    id: string;
    orderId: string;
    date: string;
    customer: string;
    service: string;
    gross: number;
    fee: number;
    net: number;
    status: string;
  }>;
}

export function EarningsView({
  onWithdrawToast,
  availableBalance: externalBalance,
  pendingEscrow = 0,
  lifetimeEarned = 0,
  transactions = [],
}: EarningsViewProps) {
  const momoNumber = "024 551 8920";
  const network = "MTN Mobile Money";
  const [withdrawnAmount, setWithdrawnAmount] = React.useState(0);
  const availableBalance = Math.max(0, (externalBalance ?? 0) - withdrawnAmount);
  const [isWithdrawing, setIsWithdrawing] = React.useState(false);

  const handleWithdraw = () => {
    if (availableBalance <= 0) return;
    setIsWithdrawing(true);
    setTimeout(() => {
      onWithdrawToast?.(
        `Withdrawal of GHS ${availableBalance.toFixed(2)} sent to ${network} (${momoNumber}) successfully!`
      );
      setWithdrawnAmount((prev) => prev + availableBalance);
      setIsWithdrawing(false);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Available Balance */}
        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#74767E] uppercase tracking-wider">
              Available for Payout
            </span>
            <div className="w-9 h-9 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-grotesque font-bold text-[32px] text-[#222325]">
              GHS {availableBalance.toFixed(2)}
            </div>
            <p className="text-[12px] text-[#008744] font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cleared from completed jobs
            </p>
          </div>
        </div>

        {/* Card 2: Pending in Escrow */}
        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#74767E] uppercase tracking-wider">
              In Escrow Protection
            </span>
            <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-grotesque font-bold text-[32px] text-[#222325]">
              GHS {pendingEscrow.toFixed(2)}
            </div>
            <p className="text-[12px] text-[#92400E] font-medium mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Releases upon job completion
            </p>
          </div>
        </div>

        {/* Card 3: Total Lifetime */}
        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#74767E] uppercase tracking-wider">
              Total Net Revenue
            </span>
            <div className="w-9 h-9 rounded-full bg-[#F3F4F6] text-[#222325] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-grotesque font-bold text-[32px] text-[#222325]">
              GHS {lifetimeEarned.toFixed(2)}
            </div>
            <p className="text-[12px] text-[#62646A] mt-1">
              Cumulative marketplace earnings
            </p>
          </div>
        </div>
      </div>

      {/* Payout Channel Configuration Card */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-[12px] bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="font-grotesque font-bold text-[16px] text-[#222325]">
              Mobile Money Payout Account
            </h3>
            <p className="text-[13px] text-[#62646A] mt-0.5">
              Automated payouts settle directly to your Ghanaian Mobile Money wallet.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-[12px] font-medium">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#222325]">
                Network: {network}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#222325]">
                Wallet: {momoNumber}
              </span>
              <span className="text-[#008744] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Instant Transfers Active
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleWithdraw}
          disabled={availableBalance <= 0 || isWithdrawing}
          className="px-5 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] disabled:bg-[#A1A1AA] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs shrink-0 flex items-center gap-2"
        >
          <ArrowUpRight className="w-4 h-4 text-[#008744]" />
          <span>
            {isWithdrawing
              ? "Processing MoMo..."
              : availableBalance > 0
              ? `Withdraw GHS ${availableBalance.toFixed(2)}`
              : "No Balance to Withdraw"}
          </span>
        </button>
      </div>

      {/* Transaction & Earnings Ledger */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden shadow-xs">
        <div className="p-6 border-b border-[#F3F4F6] flex items-center justify-between">
          <div>
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
              Earnings Breakdown & Payout History
            </h3>
            <p className="text-[13px] text-[#62646A] mt-0.5">
              Itemized statement of completed bookings and escrow status.
            </p>
          </div>
          <span className="text-[12px] text-[#74767E] bg-[#F4F4F5] px-3 py-1 rounded-[6px]">
            Platform Fee: 10%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E7EB] text-[#74767E] font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-6">Transaction Date</th>
                <th className="py-3 px-6">Booking / Customer</th>
                <th className="py-3 px-6">Gross Amount</th>
                <th className="py-3 px-6">Platform Fee</th>
                <th className="py-3 px-6">Net Earnings</th>
                <th className="py-3 px-6">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6] text-[#404145]">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#74767E]">
                    <p className="text-[14px] font-medium text-[#222325]">No transactions recorded yet</p>
                    <p className="text-[12px] mt-1 text-[#62646A]">Completed service bookings will appear here with payout status.</p>
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-4 px-6 font-medium text-[#222325]">
                      {tx.date}
                      <span className="block text-[11px] font-mono text-[#74767E]">
                        {tx.id}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-[#222325] block">
                        {tx.customer}
                      </span>
                      <span className="text-[12px] text-[#74767E]">
                        {tx.service} (#{tx.orderId})
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">GHS {tx.gross.toFixed(2)}</td>
                    <td className="py-4 px-6 text-[#74767E]">- GHS {tx.fee.toFixed(2)}</td>
                    <td className="py-4 px-6 font-bold text-[#222325]">
                      GHS {tx.net.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          tx.status === "Cleared"
                            ? "bg-[#E8F8F0] text-[#008744]"
                            : tx.status === "Escrow Holding"
                            ? "bg-[#FEF3C7] text-[#92400E]"
                            : "bg-[#F3F4F6] text-[#71717A]"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
