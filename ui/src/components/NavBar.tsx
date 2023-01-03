import React, { ChangeEvent, KeyboardEvent, useState, useCallback } from 'react';
import { redirect, Link } from 'react-router-dom';
import type { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  HomeIcon, DocumentPlusIcon,
  ChevronLeftIcon, ChevronRightIcon,
  PhotoIcon, InformationCircleIcon, PencilSquareIcon,
  Cog6ToothIcon, MagnifyingGlassIcon, XMarkIcon
} from '@heroicons/react/24/solid';

import api from '../api';
import { useKey } from '../components/KeyContext';

import * as Type from '../types/pantheon';
import * as Const from '../constants';

interface NavBarProps {
  params: ReturnType<typeof useSearchParams>[0];
  setParams: ReturnType<typeof useSearchParams>[1];
}

// TODO: Change this to 'file' and 'position' parameters (where
// position contains index and cids of files... maybe just 3 adjacent files?).
interface FocusNavBarProps extends NavBarProps {
  index: number;
  total: number;
  files: (Type.ScryFile | undefined)[];
}

export const SplashNavBar = ({params, setParams}: NavBarProps) => {
  const [query, setQuery] = useState<string>(params.get("q") || "");
  const submitQuery = useCallback(() => {
    if(query !== "") {
      params.delete("i");
      params.set("q", query);
      setParams(params.toString());
    }
  }, [query, params, setParams]);
  const submitFile = useCallback(() => {
    params.delete("i");
    params.set("q", "");
    setParams(params.toString());
  }, [params, setParams]);

  // TODO: Add support for queries based on parameters (either via
  // special syntax or by a drop-down/pop-up dialog).

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {value}: {value: string;} = event.target;
    setQuery(value);
  }, [query, setQuery]);
  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter") {
      event.preventDefault();
      submitQuery();
    }
  }, [submitQuery]);
  const onClick = useCallback(() => {
    submitQuery();
  }, [submitQuery]);

  return (
    <nav className="bg-bgp1 border-bgs1">
      <div className="flex flex-row gap-2">
        <button>
          <Link to={Const.GALLERY_PATH}>
            <HomeIcon />
          </Link>
        </button>
        <button onClick={submitFile}>
          <DocumentPlusIcon />
        </button>
        <div className="flex-1 min-w-0 input-group">
          <input type="text" placeholder="Search..."
              value={query} onChange={onChange} onKeyDown={onKeyDown} />
          <button onClick={onClick} >
            <MagnifyingGlassIcon />
          </button>
        </div>
        <button>
          <Link to={Const.CONFIG_PATH}>
            <Cog6ToothIcon />
          </Link>
        </button>
      </div>
    </nav>
  );
};

export const FocusNavBar = ({params, setParams, index, total, files}: FocusNavBarProps) => {
  const mode: Type.GalleryMode = (params.get("m") || "simple") as Type.GalleryMode;

  const onNext = useCallback(() => {
    if(files[2] !== undefined) {
      params.set("i", files[2].cid);
      setParams(params.toString());
    }
  }, [params, setParams]);
  const onPrev = useCallback(() => {
    if(files[0] !== undefined) {
      params.set("i", files[0].cid);
      setParams(params.toString());
    }
  }, [params, setParams]);

  const onClose = useCallback(() => {
    params.delete("i");
    setParams(params.toString());
  }, [params, setParams]);
  // TODO: Skip the modify form for files that aren't your own.
  const onToggle = useCallback(() => {
    const newMode: Type.GalleryMode =
      (mode === "simple") ? "detail" :
      (mode === "detail") ? "modify" :
      /*(mode === "modify") ? */ "simple";
    params.set("m", newMode);
    setParams(params.toString());
  }, [params, setParams]);

  // TODO: Make this navbar match the height of the main navbar.

  return (
    <nav className="bg-bgp2 border-bgs1">
      <div className="flex flex-row justify-between">
        {/* Left Nav */}
        <div className="flex flex-row gap-2 items-center">
          <button onClick={onPrev} disabled={files[0] === undefined}>
            <ChevronLeftIcon />
          </button>
          <h2>{index + 1} / {total}</h2>
          <button onClick={onNext} disabled={files[2] === undefined}>
            <ChevronRightIcon />
          </button>
        </div>
        {/* Center Nav */}
        <div className="flex flex-row items-center">
          <h2>{files[1]?.name}</h2>
        </div>
        {/* Right Nav */}
        <div className="flex flex-row gap-2 items-center">
          {/* TODO: Skip the modify form for files that aren't your own. */}
          <button onClick={onToggle}>
            {(mode === "simple") ? (<InformationCircleIcon />) :
              (mode === "detail") ? (<PencilSquareIcon />) :
              /*(mode === "modify") ? */ (<PhotoIcon />)
            }
          </button>
          <button onClick={onClose}>
            <XMarkIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};
